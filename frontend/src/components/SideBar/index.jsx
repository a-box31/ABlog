import "./index.scss";

const SideBar = () => {
    return (
        <div className="sidebar">
            <h2>SideBar</h2>
            <div className="following-container">
                <h3>Following</h3>
                <ul>
                    <li>Following 1</li>
                    <li>Following 2</li>
                    <li>Following 3</li>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;