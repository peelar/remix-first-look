import { Link, useLocation } from 'remix';

export const Nav = () => {
    const location = useLocation();

    return (
        <header>
            <nav aria-label="Main navigation">
                {location.pathname !== "/" && <Link to="/">🏠</Link>}
            </nav>
        </header>
    )
}
