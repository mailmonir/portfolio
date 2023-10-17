import Link from "next/link";

const LinkButton = ({ children, classes, link, onClick }) => {
  return (
    <Link href={link} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
};

export default LinkButton;
