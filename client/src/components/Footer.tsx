import { Link } from "react-router-dom"

export default function Footer(){

    return(<>
        <div className="fixed bottom-0 left-0 w-full z-50 flex justify-center items-center  p-3 bg-bg-void/50">
        <h1
            className="text-white font-semibold leading-none select-none whitespace-nowrap"
            style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: "clamp(.7rem, 1.3vw, 1rem)",
                letterSpacing: "-0.015em",
            }}
            >
            <Link to="/admin">
                <span style={{ color: "#c8d8f0" }}>Admin?</span>{" "}
                <span style={{ fontStyle: "italic" }}>Click Here!</span>
            </Link>
        </h1>
    </div>
    </>)
}