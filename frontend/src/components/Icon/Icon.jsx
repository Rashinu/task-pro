export const Icon = ({ name, className, ...rest }) => (
  <svg className={className} aria-hidden="true" {...rest}>
    <use href={`/icons.svg#${name}`} />
  </svg>
);
