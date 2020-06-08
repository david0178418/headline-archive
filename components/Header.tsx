import Link from "next/link";

export
function Header() {
	return (
		<header>
			<Link href="/">
				<a>Home</a>
			</Link>{" "}
			<Link href="/blog">
				<a>Blog</a>
			</Link>{" "}
			<Link href="/about">
				<a>About</a>
			</Link>
		</header>
	);
}
