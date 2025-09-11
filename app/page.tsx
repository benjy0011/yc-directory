import Hello from "./components/hello";

export default function Home() {
  console.log("Hello world")

  return (
    <>
      <h1>Hello NextJS</h1>
      <Hello />
    </>
    
  );
}
