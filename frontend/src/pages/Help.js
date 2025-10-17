import { useState } from 'react'
import '../styles/ui.css'
import '../styles/help.css'
import PageHeader from '../components/PageHeader'
import defenseManagement from '../images/defenseManagement.png'
import filterDefenses from '../images/filterDefenses.png'
import fraudFilter from '../images/fraudFilter.png'
import defenseCoverage from '../images/defenseCoverage.png'

function Collapsible({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="help-container">
      <h1
        className="collapsible-header"
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: 'pointer', userSelect: 'none' }}
      >
        {title} {isOpen ? '▼' : '▶'}
      </h1>

      {isOpen && <div className="collapsible-content">{children}</div>}
    </div>
  )
}

function Help() {
  return (
    <div className="page">
      <PageHeader title="Help" backPath="/home" />

      <main className="help-page">
        <div className="help-outer">
          {/* --- Always visible first section --- */}
          <div className="help-container">
            <h1>Learn About Fantasy Fraud League</h1>
            <p>
              In this game, you take control of your own virtual bank, protecting your finances from waves of cunning fraud attacks! Your goal is to buy, upgrade, and manage powerful defenses to stop cybercriminals in their tracks. Each defense you own helps block specific types of fraud, and the stronger your defenses, the less money you lose when attacks strike. But beware! Attacks have different wave difficulty levels, and your balance can even go negative if you’re not prepared! Plan your upgrades wisely, sell defenses when you need quick cash, and find the perfect balance between strategy, timing, and survival.
            </p>
          </div>

          <br />

          {/* --- Collapsible Sections --- */}
          <Collapsible title="🛡️ Defenses">
            <h2>How do I Buy Defenses?</h2>
            <p>
              In the <strong>Cyber Defense Shop</strong>, you’ll discover 20 unique defenses designed to help you protect your digital assets from a wide range of fraud attacks. Each defense specialises in countering specific types of fraud. Whether you’re building your first line of defense or upgrading to stay ahead of tougher attacks, the Defense Shop is your command center for keeping your balance safe.
            </p>

            <div className="help-section-flex">
              <div className="help-text">
                <p>
                  <strong>Each defense page</strong> includes a handy management panel on the right. This shows your <strong>current defense level, the buy or upgrade costs and presents the option to sell if you already own it</strong>.
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
              If you’re extra curious, every defense includes a reference link at the bottom so you can explore trusted cybersecurity sources and gain deeper insight into the tools used by real-world defenders!
            </p>

            <div className="help-section-flex">
              <div className="help-text">
                <h2>Where do I find my owned defenses?</h2>
                <p>
                  The filter button found at the top right corner of the Cyber Defense Shop to filter and sort your defenses for quick access. Here are some of the options you can use:
                </p>
              </div>

              <div className="help-image">
                <img src={filterDefenses} alt="Filter Defenses" />
              </div>
            </div>
          </Collapsible>

          <br />

          <Collapsible title="⚔️ Understanding Fraud Attacks">
            <p>
              The <strong>Fraud Wiki</strong> is your go-to guide for understanding all 20 types of fraud attacks in the game. Each fraud has a dedicated page where you’ll learn what the attack is about, see real-world examples, and explore how it evolved over time. You’ll also find a list of the <strong>primary defenses</strong> that help protect against it. If you’re feeling extra curious, click on the reference link at the bottom of the page to explore trusted cybersecurity sources for deeper insights!
            </p>

            <div className="help-section-flex">
              <div className="help-text">
                <p>
                  The <strong>Filter</strong> button in the top right corner of the Fraud Wiki to sort the 20 frauds based on how well your current defenses protect you. Each fraud card shows a <strong>protection percentage</strong>, a quick way to see how effectively your defenses stand up against that threat. You can also sort by coverage level to help you plan your next upgrade or purchase when strategizing in the Defense Shop.
                </p>
              </div>

              <div className="help-image">
                <img src={fraudFilter} alt="Filter Frauds" />
              </div>
            </div>

            <h2>Defense Coverage</h2>
            <div className="help-section-flex">
              <div className="help-text">
                <p>
                  Each fraud’s page includes a dynamic <strong>Defense Coverage Graph</strong> on the right-hand panel. This chart gives you a quick overview of how well your current defenses protect you against that specific attack.
                </p>
                <p>
                  Hover over any defense bar to see extra details, including your <strong>current protection percentage</strong>, what your <strong>next upgrade</strong> will improve it by, and your <strong>maximum potential</strong> at full level.
                </p>
              </div>

              <div className="help-image">
                <img src={defenseCoverage} alt="Defense Coverage" />
              </div>
            </div>

            <h3>How it's Calculated (for the Curious!)</h3>
            <p>The formula is simple:</p>
            <code>
              Current Protection + (Remaining × Next Level Factor)
            </code>

            <p>
              For example, if your current protection is 80%, and upgrading increases it to 95%, then you have 20% protection still to gain. Thus the Max Level Potential is given by:
            </p>
            <code>Max Level Potential = 80% + (20% × 95%) = 99%</code>

            <p>
              So, once your defense is fully upgraded, you’ll reach 99% protection against that fraud. The game calculates this automatically.
            </p>
          </Collapsible>

          <br />

          <Collapsible title="📊 Attack Waves and Logs">
            <p>
                The Admin player sends out the attacks. They are the options of sending a random, easy, medium or hard attack wave. They can also choose from the list of frauds listed within the Fraud Wki and custom attack at once. 
            </p>

            <p>
                You as a player have roughly 5 minutes to build your defense before an attack is sent out. After the attack is sent out, your balance will either be reduced by the amount of money lost or increased by the amount of money won and this depends on how well you defend against the attack.
            </p>

            <p>
                Navigate to the Attack Log page to see the history of attacks and your results. You can also visit the Analysis page to track your overall defense performance (coming soon...).
            </p>
          </Collapsible>

          <br />

          <Collapsible title="💰 Income Strategies">
            <ol>
                <li>
                <strong>Interest:</strong> Earn passive income from your current balance by earning 10% interest on your balance after an attack.
                </li>
                <li>
                <strong>Defense Bonus:</strong> Earn income based on how well your defenses protect you from attacks.
                <ul>
                    <li>0 star (0–10% defended): No income</li>
                    <li>1 star (10–30% defended): $25,000 Bonus</li>
                    <li>2 star (30–50% defended): $50,000 Bonus</li>
                    <li>3 star (50–75% defended): $100,000 Bonus</li>
                    <li>4 star (75–90% defended): $150,000 Bonus</li>
                    <li>5 star (90–100% defended): $200,000 Bonus</li>
                </ul>
                </li>
                <li>
                <strong>Sell Defenses:</strong> You can sell your defenses for extra money, but you will lose 50% of the cost that you initially bought it for. So choose your defenses wisely!
                </li>
            </ol>
          </Collapsible>

          <br />

          <Collapsible title="🏆 Leaderboard">
            <p>
                Leaderboard is calculated based on the players net worth. The net worth is the players current balance plus the amount they have spent/invested into their defenses. This includes all the money spent on purchasing and upgrading the defense. 
            </p>
          </Collapsible>
        </div>
      </main>
    </div>
  )
}

export default Help
