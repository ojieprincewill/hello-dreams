import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import supabase from '@/supabase/client';

export const useRealtimeSubscriptions = () => {
  const queryClient = useQueryClient();
  const subscriptionsRef = useRef([]);
  const retryTimeoutRef = useRef(null);

  useEffect(() => {
    let isSubscribed = true;
    const MAX_RETRY_TIME = 15 * 1000; // 15 seconds in milliseconds
    const RETRY_INTERVAL = 5000; // 5 seconds
    
    // Move retry tracking inside useEffect to avoid hook order changes
    let retryCount = 0;
    let startTime = null;

    const setupSubscriptions = async () => {
      try {
        // Clear any existing retry timeout
        if (retryTimeoutRef.current) {
          clearTimeout(retryTimeoutRef.current);
        }

        console.log('Setting up realtime subscriptions...');
        
        // Set up real-time subscriptions for all admin tables
        const subscriptions = [];

        // Jobs table subscription
        const jobsSubscription = supabase
          .channel('jobs-changes')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'job_postings',
            },
            (payload) => {
              if (!isSubscribed) return;
              
              console.log('Jobs subscription update:', payload);
              
              // Update the jobs cache based on the event type
              queryClient.setQueryData(['jobs'], (oldData) => {
                if (!oldData) return oldData;
                
                switch (payload.eventType) {
                  case 'INSERT':
                    return [payload.new, ...oldData];
                  case 'UPDATE':
                    return oldData.map(job => 
                      job.id === payload.new.id ? payload.new : job
                    );
                  case 'DELETE':
                    return oldData.filter(job => job.id !== payload.old.id);
                  default:
                    return oldData;
                }
              });

              // Also update public jobs cache
              queryClient.setQueryData(['public-jobs'], (oldData) => {
                if (!oldData) return oldData;
                
                // Invalidate public jobs cache to refetch
                queryClient.invalidateQueries({ queryKey: ['public-jobs'] });
                return oldData;
              });
            }
          )
          .subscribe((status) => {
            console.log('Jobs subscription status:', status);
            if (status === 'CHANNEL_ERROR' && isSubscribed) {
              console.error('Jobs subscription error');
              scheduleRetry();
            }
          });

        subscriptions.push(jobsSubscription);

        // Blog posts table subscription
        const blogSubscription = supabase
          .channel('blog-changes')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'blogs',
            },
            (payload) => {
              if (!isSubscribed) return;
              
              console.log('Blogs subscription update:', payload);
              
              // Update blogs infinite query cache
              queryClient.setQueryData(['blogs'], (oldData) => {
                if (!oldData) return oldData;
                
                const newPages = oldData.pages.map(page => {
                  const newItems = page.items.map(blog => 
                    blog.id === payload.new.id ? payload.new : blog
                  );
                  
                  // Handle different event types
                  switch (payload.eventType) {
                    case 'INSERT':
                      return { ...page, items: [payload.new, ...page.items] };
                    case 'UPDATE':
                      return { ...page, items: newItems };
                    case 'DELETE':
                      return { ...page, items: page.items.filter(blog => blog.id !== payload.old.id) };
                    default:
                      return page;
                  }
                });
                
                return { ...oldData, pages: newPages };
              });

              // Also update published blogs cache
              queryClient.setQueryData(['published-blogs'], (oldData) => {
                if (!oldData) return oldData;
                
                const newPages = oldData.pages.map(page => {
                  const newItems = page.items.map(blog => 
                    blog.id === payload.new.id ? payload.new : blog
                  );
                  
                  // Handle different event types
                  switch (payload.eventType) {
                    case 'INSERT':
                      // Only add if published
                      if (payload.new.published) {
                        return { ...page, items: [payload.new, ...page.items] };
                      }
                      return page;
                    case 'UPDATE':
                      // If unpublished, remove from published list
                      if (!payload.new.published) {
                        return { ...page, items: page.items.filter(blog => blog.id !== payload.new.id) };
                      }
                      return { ...page, items: newItems };
                    case 'DELETE':
                      return { ...page, items: page.items.filter(blog => blog.id !== payload.old.id) };
                    default:
                      return page;
                  }
                });
                
                return { ...oldData, pages: newPages };
              });
            }
          )
          .subscribe((status) => {
            console.log('Blogs subscription status:', status);
            if (status === 'CHANNEL_ERROR' && isSubscribed) {
              console.error('Blogs subscription error');
              scheduleRetry();
            }
          });

        subscriptions.push(blogSubscription);

        // Collections table subscription
        const collectionsSubscription = supabase
          .channel('collections-changes')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'collections',
            },
            (payload) => {
              if (!isSubscribed) return;
              
              console.log('Collections subscription update:', payload);
              
              queryClient.setQueryData(['collections'], (oldData) => {
                if (!oldData) return oldData;
                
                switch (payload.eventType) {
                  case 'INSERT':
                    return [payload.new, ...oldData];
                  case 'UPDATE':
                    return oldData.map(collection => 
                      collection.id === payload.new.id ? payload.new : collection
                    );
                  case 'DELETE':
                    return oldData.filter(collection => collection.id !== payload.old.id);
                  default:
                    return oldData;
                }
              });
            }
          )
          .subscribe((status) => {
            console.log('Collections subscription status:', status);
            if (status === 'CHANNEL_ERROR' && isSubscribed) {
              console.error('Collections subscription error');
              scheduleRetry();
            }
          });

        subscriptions.push(collectionsSubscription);

        // Community challenges table subscription
        const challengesSubscription = supabase
          .channel('challenges-changes')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'ui_challenges',
            },
            (payload) => {
              if (!isSubscribed) return;
              
              console.log('Challenges subscription update:', payload);
              
              queryClient.setQueryData(['challenges'], (oldData) => {
                if (!oldData) return oldData;
                
                switch (payload.eventType) {
                  case 'INSERT':
                    return [payload.new, ...oldData];
                  case 'UPDATE':
                    return oldData.map(challenge => 
                      challenge.id === payload.new.id ? payload.new : challenge
                    );
                  case 'DELETE':
                    return oldData.filter(challenge => challenge.id !== payload.old.id);
                  default:
                    return oldData;
                }
              });
            }
          )
          .subscribe((status) => {
            console.log('Challenges subscription status:', status);
            if (status === 'CHANNEL_ERROR' && isSubscribed) {
              console.error('Challenges subscription error');
              scheduleRetry();
            }
          });

        subscriptions.push(challengesSubscription);

        // Courses table subscription
        const coursesSubscription = supabase
          .channel('courses-changes')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'courses',
            },
            (payload) => {
              if (!isSubscribed) return;
              
              console.log('Courses subscription update:', payload);
              
              queryClient.setQueryData(['courses'], (oldData) => {
                if (!oldData) return oldData;
                
                switch (payload.eventType) {
                  case 'INSERT':
                    return [payload.new, ...oldData];
                  case 'UPDATE':
                    return oldData.map(course => 
                      course.id === payload.new.id ? payload.new : course
                    );
                  case 'DELETE':
                    return oldData.filter(course => course.id !== payload.old.id);
                  default:
                    return oldData;
                }
              });
            }
          )
          .subscribe((status) => {
            console.log('Courses subscription status:', status);
            if (status === 'CHANNEL_ERROR' && isSubscribed) {
              console.error('Courses subscription error');
              scheduleRetry();
            }
          });

        subscriptions.push(coursesSubscription);

        // Store subscriptions for cleanup
        subscriptionsRef.current = subscriptions;

        // Reset retry count on successful connection
        retryCount = 0;
        startTime = null;
        
        console.log('Realtime subscriptions setup complete');

      } catch (error) {
        console.error('Error setting up realtime subscriptions:', error);
        if (isSubscribed) {
          scheduleRetry();
        }
      }
    };

    const scheduleRetry = () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }

      // Initialize start time on first retry
      if (startTime === null) {
        startTime = Date.now();
      }

      // Check if we've exceeded the maximum retry time
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime >= MAX_RETRY_TIME) {
        console.error('Max retry time exceeded for realtime subscriptions');
        return;
      }

      retryCount++;
      console.log(`Retrying realtime subscriptions (attempt ${retryCount})`);
      
      retryTimeoutRef.current = setTimeout(() => {
        if (isSubscribed) {
          setupSubscriptions();
        }
      }, RETRY_INTERVAL);
    };

    // Initial setup
    setupSubscriptions();

    // Cleanup function to unsubscribe from all channels
    return () => {
      isSubscribed = false;
      
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }

      subscriptionsRef.current.forEach(subscription => {
        try {
          supabase.removeChannel(subscription);
        } catch (error) {
          console.error('Error removing subscription:', error);
        }
      });
      
      subscriptionsRef.current = [];
    };
  }, [queryClient]);
}; 