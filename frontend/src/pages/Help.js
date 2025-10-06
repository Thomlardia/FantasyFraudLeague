import '../styles/ui.css';
import PageHeader from '../components/PageHeader';

function Help() {
    return (
        <div className="page">
            <PageHeader title="Help" backPath="/home" />
            <main className="home-main">
                <p>Help page (to be implemented)</p>
            </main>
        </div>
    );
}

export default Help;