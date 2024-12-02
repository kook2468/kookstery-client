import LoginForm from "@/components/login-form";
import Image from "next/image";

export default function DesktopLogin() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      {/* Left Div */}
      <div className="flex-1 bg-light min-h-screen flex items-center rounded-left w-full">
        <div className="min-h-screen w-full flex flex-col md:flex-row">
          <div className="flex-1 flex justify-end items-center p-32">
            <div className="max-w-lg w-full text-center">
              <Image
                src="/wizard-icon.png"
                alt="Wizard"
                width={180}
                height={180}
                className="mx-auto md:ml-auto mt-20"
              />

              <div className="mt-48 text-sm">
                <Image
                  src="/github-icon.png"
                  alt="Github"
                  width={48}
                  height={48}
                  className="mx-auto md:ml-auto my-5"
                />

                <p>제작 @kook2468</p>
                <p>cdg9808@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Div */}
      <div className="flex-1 bg-white min-h-screen">
        <div className="min-h-screen w-full bg-light flex items-center">
          <div className="flex-1 flex justify-start items-center p-10 2xl:p-32 bg-white min-h-screen rounded-right">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
