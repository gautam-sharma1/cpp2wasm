export default function Header() {
    return (
        <div className="navbar">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">WasmGen</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><a>About</a></li>
                    <li><a>Pricing</a></li>
                    <li><a>Contact us</a></li>
                    {/* <li>
                        <details>
                            <summary>
                                Contact Us
                            </summary>
                            <ul className="p-2 bg-base-100 rounded-t-none">
                                <li><a>Link 1</a></li>
                                <li><a>Link 2</a></li>
                            </ul>
                        </details>
                    </li> */}
                </ul>
            </div>
        </div>
    );
}