import Link from 'next/link';

export default function Nav() {
  return (
    <div>
      <Link href="sell">
        <a>Sell Page!</a>
      </Link>
      <Link href="/">
        <a>Home</a>
      </Link>
    </div>
  );
}