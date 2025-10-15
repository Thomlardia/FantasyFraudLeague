import '../styles/ui.css';
import '../styles/help.css';
import PageHeader from '../components/PageHeader';
import defenseManagement from '../images/defenseManagement.png';
import filterDefenses from '../images/filterDefenses.png';
import fraudFilter from '../images/fraudFilter.png';
import defenseCoverage from '../images/defenseCoverage.png';

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
                    <h1>🛡️ Defenses</h1>

                    <h2>How do I Buy Defenses?</h2>
                    <p>
                        In the Cyber Defense Shop, you’ll discover 20 unique defenses designed to help you protect your digital assets from a wide range of fraud attacks. Each defense has its own purpose and specialises in countering specific types of fraud; from phishing and brute-force attacks to deepfakes and ransomware.
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


                    <h2>Learn More about the Defenses</h2>
                    <p>
                        If you’d like to learn more about a particular defense, simply click on its name to open a detailed information page. There, you’ll find a clear description of what the defense does, some real-world examples of how it’s used, and a list of the fraud types it helps defend against. Curious about one of those frauds? You can click the fraud’s name to jump straight to its dedicated page in the Fraud Wiki, where you’ll learn exactly how that attack works.
                    </p>

                    <p>
                        And if you’re extra curious, every defense includes a reference link at the bottom so you can explore trusted cybersecurity sources and gain deeper insight into the tools used by real-world defenders!
                    </p>

                    <div className="help-section-flex">
                        <div className="help-text">
                            <h2>Where do I find my owned defenses?</h2>
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
                    <h1>⚔️ Understanding Fraud Attacks</h1>
                    <p>
                        The <strong>Fraud Wiki</strong> is your go-to guide for understanding all 20 types of fraud attacks in the game. Each fraud has its own dedicated page where you’ll learn what the attack is about, see real-world examples, and explore how it evolved over time. You’ll also find a list of the <strong>primary defenses</strong> that help protect against it. If you’re feeling extra curious, click on the reference link at the bottom of the page to explore trusted cybersecurity sources for deeper insights!
                    </p>

                    <div className="help-section-flex">
                        <div className="help-text">
                            <p>
                                On the main <strong>Fraud Wiki</strong> page, you can use the <strong>Filter</strong> button in the top right corner to sort the 20 frauds based on how well your current defenses protect you. Each fraud card shows a <strong>protection percentage</strong>, a quick way to see how effectively your defenses stand up against that threat. You can also sort by coverage level to help you plan your next upgrade or purchase when strategizing in the Defense Shop.
                            </p>
                        </div>

                        <div className="help-image">
                            <img src={fraudFilter} alt="Filter Frauds"/>
                        </div>
                    </div>

                    <h2> Defense Coverage</h2>
                    <div className="help-section-flex">
                        <div className="help-text">
                            <p>
                                Each fraud’s page includes a dynamic <strong>Defense Coverage Graph</strong> on the right-hand panel. This chart gives you a quick overview of how well your current defenses protect you against that specific attack. 
                            </p>
                            <p>
                                Hover over any defense bar to see extra details, including your <strong>current protection percentage</strong>, what your <strong>next upgrade</strong> will improve it by, and your <strong>maximum potential</strong> at full level. Think of it like tracking your defense growth, your next level brings you closer to full protection, and the max potential shows the absolute best that defense can achieve against this type of fraud.
                            </p>
                        </div>

                        <div className="help-image">
                            <img src={defenseCoverage} alt="Defense Coverage"/>
                        </div>
                    </div>

                    <h3>How it's Calculated (for the Curious!)</h3>
                    <p>The formula is simple:</p>
                    <code>
                        Max Potential = Current Protection + (Remaining × Max Level Factor)
                    </code>

                    <p>
                        For example, if your current protection is 80%, and upgrading increases it is 95% protention, then you have 20% protection still to gain. Thus the Max Level Potention is given by:
                    </p>
                    <code>Max Potential = 80% + (20% × 95%) = 99%</code>

                    <p> 
                        So, once your defense is fully upgraded, you’ll reach 99% protection against that fraud. The game calculates this automatically.
                    </p>
                </div>

                <br></br>

                <div className="help-container">
                    <h1>📊 Attack Waves and Logs</h1>
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

                <br></br>

                <div className="help-container">
                    <h1>🏆 Leaderboard</h1>
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
