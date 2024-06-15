import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'

const features = [
    {
        name: 'Wyprowadzacze psów',
        description:
            'Profesjonalni wyprowadzacze zapewniają regularne spacery dla Twojego psa, dostosowane do jego potrzeb i kondycji. Idealne rozwiązanie dla zapracowanych właścicieli.',
        icon: CloudArrowUpIcon,
    },
    {
        name: 'Opieka nad małymi zwierzętami',
        description:
            'Specjalistyczna opieka nad małymi zwierzętami, takimi jak koty, króliki, chomiki czy ptaki. Opiekunowie zapewniają odpowiednie karmienie, czyszczenie klatek oraz zabawę, aby Twój pupil czuł się komfortowo.',
        icon: LockClosedIcon,
    },
    {
        name: 'Opieka u Ciebie lub u opiekuna',
        description:
            'Możliwość wyboru opieki w Twoim domu lub u opiekuna. Elastyczne opcje dostosowane do Twoich potrzeb, gwarantujące bezpieczeństwo i komfort Twojego zwierzaka.',
        icon: ArrowPathIcon,
    },
    {
        name: 'Zweryfikowani opiekunowie',
        description:
            'Wszyscy opiekunowie są starannie sprawdzani i weryfikowani, aby zapewnić najwyższy poziom bezpieczeństwa i zaufania. Możesz być pewien, że Twój zwierzak jest w dobrych rękach.',
        icon: FingerPrintIcon,
    },
]

export default function HowDoesItWork() {
    return (
        <div className="bg-white py-24 sm:py-32" id="how-does-it-work">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">Kim jesteśmy?</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Jak to u nas działa?
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600 text-justify">
                        Tworzymy aplikację dedykowaną osobom, które potrzebują wsparcia w opiece nad swoimi zwierzętami podczas wyjazdów lub codziennych obowiązków. Nasza platforma łączy właścicieli zwierząt z opiekunami oraz osobami wyprowadzającymi, umożliwiając bezpieczne i wygodne rozwiązania dla wszystkich uczestników. Dzięki naszej aplikacji, właściciele zwierząt mogą bez trudu znaleźć odpowiedniego opiekuna, a osoby chcące dorobić mogą łatwo zaoferować swoje usługi.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
