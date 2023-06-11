import AlumList from "@/components/AlumList";

export const metadata = {
  title: "List of Alumni",
};

export default function Home() {
  return (
    <>
      <h2>List of Alumni</h2>
      <AlumList />
    </>
  );
}
