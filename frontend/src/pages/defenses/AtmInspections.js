import { Link } from 'react-router-dom';

function AtmInspections() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
        }}>
            {/* Title section */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '32px'
            }}>
                <h1>AtmSkimming</h1>
            </div>

            {/* Description Section */}
            <section style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '24px 0'
            }}>
                <div style={{ maxWidth: '600px', textAlign: 'center' }}>
                    <p>Description</p>
                </div>
            </section>

            {/* Side-by-side Defense & Upgrades */}
            <section style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: '20px',
                marginBottom: '32px',
                flexWrap: 'wrap'
            }}>
                {/* Defense Against Section */}
                <div style={{
                    flex: '1',
                    minWidth: '180px',
                    maxWidth: '220px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '16px'
                }}>
                    <h4 style={{ margin: '0 0 8px 0' }}>Defends against:</h4>
                    <ul style={{ margin: 0, paddingLeft: '18px' }}>
                        <li>
                            <Link to="/frauds/AtmSkimming">AtmSkimming</Link>
                        </li>
                    </ul>
                </div>

                {/* Upgrades & Purchases Section */}
                <div style={{
                    flex: '2',
                    minWidth: '350px',
                    minHeight: '100px',
                    border: '1px dashed #ccc',
                    borderRadius: '8px',
                    padding: '24px'
                }}>
                    <h3 style={{ margin: '0 0 16px 0' }}>Upgrades & Purchases</h3>
                </div>
            </section>

            {/* Back Button */}
            <div style={{
                position: 'fixed',
                bottom: '16px',
                left: '32px'
            }}>
                <Link to="/defenseshop">BACK</Link>
            </div>
        </div>
    );
}

export default AtmInspections;
