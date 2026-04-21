import { Link } from "react-router-dom"
export default function Navbar () {

    return(<>
    <div className="fixed top-0 left-0 w-full z-50 flex justify-between p-3 m-2">
        <h1
            className="text-white font-semibold leading-none select-none whitespace-nowrap"
            style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: "clamp(1rem, 2vw, 1.4rem)",
                letterSpacing: "-0.015em",
            }}
            >
            <span style={{ color: "#c8d8f0" }}>the</span>{" "}
            <span style={{ fontStyle: "italic" }}>Blog</span>
        </h1>
        <div className="flex gap-3">
            <Link to="/sign-in" className="text-blue-100 p-3 border border-blue-100 rounded-full hover:bg-blue-100 hover:text-black transition-all"> Log In</Link>
            <Link to="/register" className="text-blue-100 p-3 border border-blue-100 rounded-full hover:bg-blue-100 hover:text-black transition-alll"> Sign Up</Link>
        </div>
    </div>
        </>)
}