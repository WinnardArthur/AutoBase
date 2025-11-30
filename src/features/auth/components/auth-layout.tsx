import Link from "next/link";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-muted flex min-h-svh flex-col justify-center items-center p-6 md:p-10">
      <Link
        href={"/"}
        className="flex items-center justify-center gap-2 font-medium mb-4"
      >
        <Image
          src={"/autobase-logo.svg"}
          alt="Autobase"
          width={30}
          height={30}
          className=""
        />
        AutoBase
      </Link>
      <div className="max-w-sm flex flex-col gap-6 w-full">{children}</div>
    </div>
  );
};

export default AuthLayout;
