import React from 'react';

const AboutPanel: React.FC = () => (
  <div className="panel p-6 md:p-8">
    <h3 className="text-xl font-semibold text-foreground">Profile</h3>
    <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
      <p>
        I&rsquo;m Prajal Jung Kunwar, an AI/ML developer and digital product
        designer based in Pokhara, Nepal. I work across machine learning,
        computer vision, mobile development and interface design.
      </p>
      <p>
        My focus is on shipping products that feel considered end to end &mdash;
        from data and model behaviour through to the details of the interface
        people actually touch.
      </p>
      <p>
        Currently studying BSc (Hons) Business Information Technology at London
        Metropolitan University, while working with clients on web, mobile and
        brand design projects.
      </p>
    </div>

    <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 text-sm">
      <div>
        <dt className="text-muted-foreground">Focus</dt>
        <dd className="mt-1 font-medium text-foreground">AI/ML &amp; Product</dd>
      </div>
      <div>
        <dt className="text-muted-foreground">Location</dt>
        <dd className="mt-1 font-medium text-foreground">Pokhara, Nepal</dd>
      </div>
    </dl>
  </div>
);

export default React.memo(AboutPanel);
