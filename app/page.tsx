import TestButton from "@/components/TestButton";

export const metadata = {
  title: "Hello World",
};

export default function Home() {
  return (
    <>
      <h1>Gunn Alumni Website</h1>
      <p>
        Hey look something happened in that shithole you got out of five years
        ago and have buried deep in your memory since!
      </p>
      <TestButton />
    </>
  );
}
