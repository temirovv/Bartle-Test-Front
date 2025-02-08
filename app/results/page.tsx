'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../context/useTranslation';

// Define ResultsDataType interface to match the expected structure of resultsData
interface ResultsDataType {
    scores: {
        explorer: number;
        killer: number;
        socializer: number;
        achiever: number;
    };
    primaryType: string;
    aiConclusion?: string; // AI conclusion is optional
}

// Define BartleTypeInfo type to match the structure of bartleTypeInfo object
interface BartleTypeInfoType {
    [key: string]: {
        names: { en: string; uz: string; ru: string };
        descriptions: { en: string; uz: string; ru: string };
        characteristics: { en: string[]; uz: string[]; ru: string[] };
    };
}


export default function ResultsPage() {
    const { setLocale, locale } = useLanguage();
    const { t } = useTranslation();
    // Explicitly type resultsData state using ResultsDataType interface, initialize to null
    const [resultsData, setResultsData] = useState<ResultsDataType | null>(null);
    const [aiConclusion, setAiConclusion] = useState<string | null>(null);

    // Explicitly type bartleTypeInfo object with BartleTypeInfoType interface
    const bartleTypeInfo: BartleTypeInfoType = {
        explorer: {
            names: {
                en: "Explorer",
                uz: "Tadqiqotchi",
                ru: "Исследователь",
            },
            descriptions: {
                en: "Explorers are driven by curiosity. They love to discover new areas, learn about game mechanics, and uncover hidden secrets. For Explorers, the journey is just as rewarding as the destination.",
                uz: "Tadqiqotchilar qiziquvchanlik bilan boshqariladi. Ular yangi hududlarni kashf qilishni, o'yin mexanikasini o'rganishni va yashirin sirlarni ochishni yaxshi ko'radilar. Tadqiqotchilar uchun sayohat maqsadga yetishish kabi muhimdir.",
                ru: "Исследователи движимы любопытством. Они любят открывать новые области, изучать игровые механики и раскрывать скрытые секреты. Для Исследователей путешествие так же ценно, как и пункт назначения."
            },
            characteristics: {
                en: [
                    "Curious and inquisitive",
                    "Loves exploring new areas and game mechanics",
                    "Enjoys challenges and discovering secrets",
                    "Values knowledge and understanding",
                ],
                uz: [
                    "Qiziquvchan va bilimdon",
                    "Yangi hududlar va o'yin mexanikasini o'rganishni yaxshi ko'radi",
                    "Qiyinchiliklardan va sirlarni ochishdan zavqlanadi",
                    "Bilim va tushunishni qadrlaydi",
                ],
                ru: [
                    "Любопытный и пытливый",
                    "Любит исследовать новые области и игровые механики",
                    "Наслаждается вызовами и открытием секретов",
                    "Ценит знания и понимание",
                ],
            },
        },
        achiever: {
            names: {
                en: "Achiever",
                uz: "Muvaffaqiyatchi",
                ru: "Достигатель",
            },
            descriptions: {
                en: "Achievers are motivated by goals and progress. They enjoy challenges, earning points, badges, and climbing leaderboards. For Achievers, overcoming obstacles and mastering the game is what brings satisfaction.",
                uz: "Muvaffaqiyatchilar maqsadlar va taraqqiyotga intilishadi. Ular qiyinchiliklardan, ochko, nishon va liderlar jadvaliga ko'tarilishdan zavqlanishadi. Muvaffaqiyatchilar uchun to'siqlarni yengish va o'yinni mukammal o'zlashtirish qoniqish keltiradi.",
                ru: "Достигатели мотивированы целями и прогрессом. Им нравятся вызовы, зарабатывание очков, значков и восхождение в рейтинговых таблицах. Для Достигателей преодоление препятствий и освоение игры приносит удовлетворение."
            },
            characteristics: {
                en: [
                    "Goal-oriented and competitive",
                    "Driven by progress and rewards",
                    "Enjoys challenges and overcoming obstacles",
                    "Values skill, mastery, and recognition",
                ],
                uz: [
                    "Maqsadga yo'naltirilgan va raqobatbardosh",
                    "Taraqqiyot va mukofotlarga intilishadi",
                    "Qiyinchiliklardan va to'siqlarni yengishdan zavqlanadi",
                    "Mahorat, mukammallik va e'tirofni qadrlaydi",
                ],
                ru: [
                    "Ориентирован на цели и конкурентоспособен",
                    "Движим прогрессом и наградами",
                    "Наслаждается вызовами и преодолением препятствий",
                    "Ценит мастерство, совершенство и признание",
                ],
            },
        },
        socializer: {
            names: {
                en: "Socializer",
                uz: "Muloqotchi",
                ru: "Социализатор",
            },
            descriptions: {
                en: "Socializers are all about interaction and community. They enjoy playing games to connect with other people, make friends, and be part of a group. For Socializers, the social experience of gaming is paramount.",
                uz: "Muloqotchilar uchun muloqot va jamoa eng muhim. Ular boshqa odamlar bilan bog'lanish, do'st orttirish va guruhning bir qismi bo'lish uchun o'yinlar o'ynashdan zavqlanishadi. Muloqotchilar uchun o'yinning ijtimoiy tajribasi eng muhimdir.",
                ru: "Социализаторы ценят взаимодействие и сообщество. Им нравится играть в игры, чтобы общаться с другими людьми, заводить друзей и быть частью группы. Для Социализаторов социальный опыт в играх имеет первостепенное значение."
            },
            characteristics: {
                en: [
                    "Enjoys social interaction and community",
                    "Loves playing with friends and making new ones",
                    "Values teamwork and cooperation",
                    "Seeks connection and belonging",
                ],
                uz: [
                    "Ijtimoiy muloqot va jamoani qadrlaydi",
                    "Do'stlar bilan o'ynashni va yangi do'stlar orttirishni yaxshi ko'radi",
                    "Jamoaviy ish va hamkorlikni qadrlaydi",
                    "Aloqa va mansublikni izlaydi",
                ],
                ru: [
                    "Наслаждается социальным взаимодействием и общением",
                    "Любит играть с друзьями и заводить новых",
                    "Ценит командную работу и сотрудничество",
                    "Ищет связи и принадлежности к группе",
                ],
            },
        },
        killer: {
            names: {
                en: "Killer",
                uz: "Qotil",
                ru: "Убийца",
            },
            descriptions: {
                en: "Killers are driven by competition and dominance. They enjoy player-versus-player combat, asserting their power, and winning at all costs. For Killers, the thrill of victory and proving their superiority is what gaming is all about.",
                uz: "Qotillar raqobat va ustunlikka intilishadi. Ular o'yinchi-o'yinchiga qarshi janglardan, o'z kuchlarini namoyon qilishdan va har qanday narxda g'alaba qozonishdan zavqlanishadi. Qotillar uchun g'alaba hayajoni va o'z ustunliklarini isbotlash o'yinning ma'nosi hisoblanadi.",
                ru: "Убийцы движимы конкуренцией и доминированием. Им нравится PvP-сражения, утверждение своей власти и победа любой ценой. Для Убийц острые ощущения победы и доказательство своего превосходства - вот что такое игры."
            },
            characteristics: {
                en: [
                    "Highly competitive and assertive",
                    "Driven by dominance and victory",
                    "Enjoys player-versus-player combat",
                    "Values power, skill in combat, and being the best",
                ],
                uz: [
                    "Juda raqobatbardosh va qat'iyatli",
                    "Ustunlik va g'alabaga intilishadi",
                    "O'yinchi-o'yinchiga qarshi janglardan zavqlanadi",
                    "Kuch, jangovar mahorat va eng yaxshi bo'lishni qadrlaydi",
                ],
                ru: [
                    "Высококонкурентный и напористый",
                    "Движим доминированием и победой",
                    "Наслаждается PvP-сражениями",
                    "Ценит власть, боевые навыки и стремление быть лучшим",
                ],
            },
        },
    };


    useEffect(() => {
        console.log("ResultsPage useEffect is running"); // Debugging log

        const storedResults = localStorage.getItem('bartleTestResults');
        const storedAiConclusion = localStorage.getItem('aiBartleConclusion');

        console.log("Stored Results from localStorage:", storedResults); // Debugging log
        console.log("Stored AI Conclusion from localStorage:", storedAiConclusion); // Debugging log

        if (storedResults) {
            try {
                // Cast parsed results to ResultsDataType
                const parsedResults = JSON.parse(storedResults) as ResultsDataType;
                setResultsData(parsedResults);
                console.log("Parsed Results Data:", parsedResults); // Debugging log
            } catch (error) {
                console.error("Error parsing storedResults JSON:", error); // Error handling for JSON parsing
            }

        }
        if (storedAiConclusion) {
            setAiConclusion(storedAiConclusion);
            console.log("Set AI Conclusion State:", storedAiConclusion); // Debugging log
        }
    }, []);

    const handleLanguageChange = (newLocale: string) => {
        setLocale(newLocale);
    };

    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    if (!resultsData) {
        return <div>Loading Results...</div>;
    }

    // Now resultsData is guaranteed to be ResultsDataType or null, so primaryType should exist
    // Add explicit type assertion here to tell TypeScript that primaryBartleType is a valid key of bartleTypeInfo
    const primaryBartleType = resultsData.primaryType as keyof BartleTypeInfoType;
    // Now currentTypeInfo should be properly typed based on primaryBartleType
    const currentTypeInfo = bartleTypeInfo[primaryBartleType];


    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <header className="bg-white shadow-sm py-4 px-6">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-semibold">{t('bartleTest')}UI</h1>
                    <div className="space-x-4">
                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full" onClick={() => handleLanguageChange('uz')}>Uzbek</button>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full" onClick={() => handleLanguageChange('en')}>English</button>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full" onClick={() => handleLanguageChange('ru')}>Russian</button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-10 flex-grow">
                <div className="bg-purple-50 rounded-3xl p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('resultsTitle')}</h2>
                    {resultsData && currentTypeInfo && (
                        <>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                {t('Your Bartle Type is:')} {currentTypeInfo.names[locale as keyof typeof currentTypeInfo.names]} {/* Type assertion for locale */}
                            </h3>
                            <p className="text-gray-700 mb-6">
                                {currentTypeInfo.descriptions[locale as keyof typeof currentTypeInfo.descriptions]} {/* Type assertion for locale */}
                            </p>

                            {aiConclusion && (
                                <div className="mb-8 p-4 rounded-lg bg-purple-100 border border-purple-200">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{t('AI Conclusion:')}</h4>
                                    <p className="text-gray-800">{aiConclusion}</p>
                                </div>
                            )}


                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('characteristics')}</h3>
                                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                                        {currentTypeInfo.characteristics[locale as keyof typeof currentTypeInfo.characteristics].map((characteristic, index) => ( // Type assertion for locale
                                            <li key={index}>{characteristic}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex justify-center items-center">
                                    {/* Placeholder for Pie Chart */}
                                    <div className="w-40 h-40 rounded-full bg-purple-200 border border-purple-300">
                                        {/* You'd likely replace this with an actual chart component */}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Scores:</h3>
                                <p className="text-gray-700">Explorer: {resultsData.scores.explorer}</p>
                                <p className="text-gray-700">Killer: {resultsData.scores.killer}</p>
                                <p className="text-gray-700">Socializer: {resultsData.scores.socializer}</p>
                                <p className="text-gray-700">Achiever: {resultsData.scores.achiever}</p>
                            </div>
                        </>
                    )}
                </div>
            </main>

            <footer className="bg-purple-700 py-4 px-6">
                <div className="container mx-auto flex justify-between items-center text-gray-300 text-sm">
                    <div>© 2025 {t('bartleTest')} Mars. All rights reserved.</div>
                    <div className="space-x-4">
                        <a href="#" className="hover:text-white">{t('privacyPolicy')}</a>
                        <a href="#" className="hover:text-white">{t('termsOfService')}</a>
                        <a href="#" className="hover:text-white">{t('contactUs')}</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}