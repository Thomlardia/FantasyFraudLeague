import '../styles/ui.css';
import '../styles/help.css';
import PageHeader from '../components/PageHeader';
import defenseManagement from '../images/defenseManagement.png';
import filterDefenses from '../images/filterDefenses.png';

function Help() {
    return (
        <div className="page">
        <PageHeader title="Help" backPath="/home" />

        <main className="help-page">
            <div className="help-outer">
                <div className="help-container">
                    <h1>Learn About Fantasy Fraud League</h1>
                    <p>
                    In this game, you take control of your own virtual bank, protecting your finances from waves of cunning fraud attacks! Your goal is to build, upgrade, and manage powerful defenses to stop cybercriminals in their tracks. Each defense you own helps block specific types of fraud, and the stronger your defenses, the less money you lose when attacks strike. But beware! Attacks have different wave difficulty levels, and your balance can even go negative if you’re not prepared! Plan your upgrades wisely, sell defenses when you need quick cash, and find the perfect balance between strategy, timing, and survival.
                    </p>

                </div>

                <br></br>

                <div className="help-container"> 
                    <h1>🛡️ How to Buy Defenses</h1>
                    <p>
                        In the Cyber Defense Shop, you’ll discover 20 unique defenses designed to help you protect your digital assets from a wide range of fraud attacks. Each defense has its own purpose and specialises in countering specific types of fraud; from phishing and brute-force attacks to deepfakes and ransomware.
                    </p>

                    <p>
                        If you’d like to learn more about a particular defense, simply click on its name to open a detailed information page. There, you’ll find a clear description of what the defense does, some real-world examples of how it’s used, and a list of the fraud types it helps defend against. Curious about one of those frauds? You can click the fraud’s name to jump straight to its dedicated page in the Fraud Wiki, where you’ll learn exactly how that attack works.
                    </p>

                    <div className="help-section-flex">
                        <div className="help-text">
                            <p>
                                Each defense page also includes a handy management panel on the right. This shows your current defense level, the cost to buy or upgrade, and a button to purchase, sell or improve your protection. Whether you’re building your first line of defense or upgrading to stay ahead of tougher attacks, the Defense Shop is your command center for keeping your balance safe.
                            </p>
                        </div>

                        <div className="help-image">
                            <img src={defenseManagement} alt="Defense Management Panel" />
                        </div>
                    </div>

                    <p>
                        And if you’re extra curious, every defense includes a reference link at the bottom so you can explore trusted cybersecurity sources and gain deeper insight into the tools used by real-world defenders!
                    </p>

                    <h2>Where do I find my owned defenses?</h2>
                    <div className="help-section-flex">
                        <div className="help-text">
                            <p>
                                Use the filter button found at the top right of corner of the Cyber Defense Shop to filter and sort your defenses for quick access. Here are some of the options you can use:
                            </p>
                        </div>

                        <div className="help-image">
                            <img src={filterDefenses} alt="Filter Defenses"/>
                        </div>
                    </div>
                </div>

                <br></br>

                <div className="help-container">
                    <h1>⚔️ Understanding Fraud Attacks & Waves</h1>
                    <p>
                        (in progress)
                    </p>

                    <h2>📊 Defense Coverage</h2>
                    <p>
                        (in progress)
                    </p>

                    <h2>📈 Defense Effectiveness Metrics</h2>
                    <p>
                        (in progress)
                    </p>

                    <h2>📑 Attack Logs</h2>
                    <p>
                        (in progress)
                    </p>
                </div>

                <br></br>

                <div className="help-container">
                    <h1>💰 Income Strategies</h1>
                    <p>
                        (in progress)
                    </p>
                </div>
            </div>
        </main>
    </div>
  );
}

export default Help;
