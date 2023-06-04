import AlumList from "@/components/AlumList";

export const metadata = {
  title: "Alumni List",
};

export default function Home() {
  return (
    <>
      <h2>List of Gunn Alumni</h2>
      <AlumList />
    </>
  );
}
