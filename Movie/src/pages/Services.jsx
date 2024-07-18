import React from "react";

const Services = () => {
  return (
    <div className="py-16 px-4 max-w-6xl mx-auto">
      <h1 className=" text-center text-3xl font-bold mb-4 text-slate-800">
        What We Offer
      </h1>
      <ul className="list-disc gap-3 flex flex-col justify-center">
        <li>
          Movie Reviews: Honest and detailed reviews of the latest releases,
          from big-budget blockbusters to independent films.
        </li>
        <li>
          News and Updates: Stay informed with the latest news, trailers, and
          announcements from Hollywood and beyond.
        </li>
        <li>
          Exclusive Interviews: Get up close and personal with your favorite
          actors, directors, and industry insiders.
        </li>
        <li>
          Feature Articles: Dive deep into the world of cinema with our
          thought-provoking articles and editorials.
        </li>
        <li>
          Community Forums: Connect with fellow movie enthusiasts, discuss your
          favorite films, and share your own reviews and insights.
        </li>
      </ul>
      <h1 className="py-4 text-center text-3xl font-bold mb-4 text-slate-800">
        Join the Community
      </h1>
      <p className="text-center mx-auto">
        it's a community of like-minded individuals who share a passion for
        movies. We invite you to join us, participate in our forums, and follow
        us on social media to stay connected.
      </p>
    </div>
  );
};

export default Services;
