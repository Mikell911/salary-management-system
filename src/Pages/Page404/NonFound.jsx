import {Link} from "react-router-dom";

const NonFound = () => {
    return (
        <section className={'container'}>
            <div>
                <h1>Sorry, but Page not found :(</h1>
                <Link to={'/'} className={'text-blue-500 underline'}>Back</Link>
            </div>
        </section>
    )
}

export default NonFound;