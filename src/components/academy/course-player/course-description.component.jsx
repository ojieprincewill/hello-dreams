import React, { useState } from "react";

const CourseDescription = () => {
  return (
    <div className="mb-10">
      <h3 className="text-[16px] lg:text-[20px] text-[#010413] font-bold mb-2">
        Description
      </h3>
      <div className="text-[14px] text-[#010413] space-y-4">
        <p className="mb-3">Web Design is fun. It's creative.</p>
        <p className="mb-3">
          It gives you a huge self-satisfaction when you look at your work and
          say, <b>"I made this!"</b>, I love that feeling after I'm done working
          on something, when I lean back in my chair, look at the final result
          with a smile, and have this little "tricky joy" moment.
        </p>
        <p className="mb-3">
          it's especially satisfying when I know <b>I just made $5,000</b>
        </p>
        <p className="mb-3">Wouldn't you want to have that?</p>
        <ul className="list-disc pl-6 mb-3">
          <li>Wouldn't you want to be your own boss?</li>
          <li>
            Working 2-3 hours per day and making more than what people make
            working full-time?
          </li>
          <li>Waking up whenever you want?</li>
          <li>
            Working from home? or starbucks? or Bathtub? if that's your thing,
            or from some awesome place like Bali?
          </li>
        </ul>
        <p className="mb-3">
          I do! And that's why i got into this field. Not for the love of web
          design, which i do now. But for the <b>LIFESTYLE!</b>
        </p>
        <p className="mb-3">
          There are many ways one can achieve this lifestyle.{" "}
          <b>This is my way, This is how i achieved a lifestyle</b> I've been
          fantasizing about for five years, and i'm going to{" "}
          <b>teach you the same.</b>
        </p>
        <p className="mb-3">
          often people think web design is complicated. That needs some creative
          talent or knack for computers. Sure, a lot of people make it very
          complicated. people make it very complicated. Like most subject taught
          in the universities.
        </p>
        <p className="mb-3">
          But i don't like complicated. <b>i like easy</b>. i like life hacks. i
          like to take the shortest and simplest <b>route</b> to my destination.
          i haven't gone to an art school or have a computer science degree.{" "}
          <b>I'm an outsider</b> to this field who hacked himself into it,
          somehow end up being a sought-after professional.
        </p>
        <p className="mb-3">
          <b>That's how</b> I'm going to teach you web design, so you're not
          demotivated on our way with needless complexity, so you enjoy the
          process because it's simple and fun.
          <br />
          so you can <b>become a freelance web designer in no time.</b>
        </p>
        <p className="mb-3">
          For example, this is a design course but i don't teach you Photoshop.
          Because
        </p>
      </div>

      <div className="flex justify-center items-center">
        <button className="mt-3 px-4 py-2 border-[1.5px] border-[#eaecf0] rounded-md text-[14px] font-medium hover:bg-[#eef2fe] transition-colors duration-300 cursor-pointer">
          Load more
        </button>
      </div>
    </div>
  );
};

export default CourseDescription;
