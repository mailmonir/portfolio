import Link from "next/link";

const navItems = [
  { id: 1, text: "Home", link: "/" },
  { id: 2, text: "CV", link: "/cv" },
  { id: 3, text: "About", link: "/about" },
  { id: 4, text: "Contact", link: "/contact" },
  { id: 5, text: "Blog", link: "/posts" },
];

const NavLinks = ({ links, classes }) => {
  return (
    <>
      {navItems.map((navItem) => (
        <Link key={navItem.id} href={navItem.link} className={classes}>
          {navItem.text}
        </Link>
      ))}
    </>
  );
};

export default NavLinks;
