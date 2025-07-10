import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import supabase from '@/supabase/client';

export const useRealtimeSubscriptions = () => {
  const queryClient = useQueryClient();
  const subscriptionsRef = useRef([]);

  useEffect(() => {
    let isSubscribed = true;

    const setupSubscriptions = async () => {
      try {
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
            if (status === 'CHANNEL_ERROR' && isSubscribed) {
              // Immediately unsubscribe on error - no retry
              supabase.removeChannel(jobsSubscription);
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
            if (status === 'CHANNEL_ERROR' && isSubscribed) {
              // Immediately unsubscribe on error - no retry
              supabase.removeChannel(blogSubscription);
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
            if (status === 'CHANNEL_ERROR' && isSubscribed) {
              // Immediately unsubscribe on error - no retry
              supabase.removeChannel(collectionsSubscription);
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
            if (status === 'CHANNEL_ERROR' && isSubscribed) {
              // Immediately unsubscribe on error - no retry
              supabase.removeChannel(challengesSubscription);
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
            if (status === 'CHANNEL_ERROR' && isSubscribed) {
              // Immediately unsubscribe on error - no retry
              supabase.removeChannel(coursesSubscription);
            }
          });

        subscriptions.push(coursesSubscription);

        // Store subscriptions for cleanup
        subscriptionsRef.current = subscriptions;

      } catch (error) {
        // Silent error handling - no retry, no logging
        if (isSubscribed) {
          // Clean up any existing subscriptions on error
          subscriptionsRef.current.forEach(subscription => {
            try {
              supabase.removeChannel(subscription);
            } catch (cleanupError) {
              // Silent cleanup error
            }
          });
          subscriptionsRef.current = [];
        }
      }
    };

    // Initial setup
    setupSubscriptions();

    // Cleanup function to unsubscribe from all channels
    return () => {
      isSubscribed = false;

      subscriptionsRef.current.forEach(subscription => {
        try {
          supabase.removeChannel(subscription);
        } catch (error) {
          // Silent cleanup error
        }
      });
      
      subscriptionsRef.current = [];
    };
  }, [queryClient]);
}; 