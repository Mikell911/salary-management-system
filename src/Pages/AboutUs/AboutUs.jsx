import React from "react";
import {Link} from "react-router-dom";

const AboutUs = () => {
    return (
        <section className="container py-12">
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-5">O nas</h1>
                <p className="text-lg mb-8 max-w-3xl mx-auto">
                    Witamy w naszym projekcie! System ten został zaprojektowany, aby pomóc Ci efektywnie śledzić godziny pracy, zarządzać zapisami wynagrodzeń oraz obliczać nadgodziny w intuicyjny sposób. Niezależnie od tego, czy pracujesz na godziny, dziennie czy miesięcznie, nasza aplikacja zapewnia przejrzysty i zorganizowany przegląd Twoich zarobków i harmonogramu pracy. Naszą misją jest uczynienie zarządzania czasem pracy i wynagrodzeniem prostym, efektywnym i bezstresowym.
                </p>
                <p className="text-lg mb-8 max-w-3xl mx-auto">
                    Jeśli uznasz, że ten projekt jest pomocny i chcesz wesprzeć jego rozwój, każda finansowa pomoc będzie dla nas ogromnie ważna. Twoje darowizny pomogą nam dalej rozwijać platformę, dodawać nowe funkcje oraz zapewniać sprawne działanie. Dziękujemy za Twoje wsparcie!
                </p>

                <div className="mt-8">
                    <Link
                        to="/contact"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        Wsparcie finansowe
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
