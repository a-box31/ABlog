import "./index.scss";

const SideBar = () => {
    return (
        <div className="sidebar">
            <div className="section">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/feed">Main Feed</a></li>
                    <li><a href="/followers">Followers Feed</a></li>
                    <li><a href="/following">Following</a></li>
                </ul>
            </div>
            <div className="section">
                <h3>Popular</h3>
                <ul>
                    <li>Trending</li>
                    <li>Top Rated</li>
                    <li>New Releases</li>
                </ul>
            </div>
            <div className="section">
                <h3>My Network</h3>
                <ul>
                    <li>My Followers</li>
                    <li>Following</li>
                    <li>Suggestions</li>
                </ul>
            </div>
            <div className="settings-section">
                <ul>
                    <li><a href="/settings">Settings</a></li>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;
