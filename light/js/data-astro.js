/* First Light: astrology reference data
   Extracted verbatim from first_light_year_4.html.
   Declares globals; loaded by a classic <script> tag. */

const SIGNS=[
{n:"Aries",g:"♈",from:[3,21],to:[4,19],el:"Fire",mo:"Cardinal",ru:"Mars",po:"Yang",kw:"I am",body:"Head and face",
 d:"The first sign, and it behaves like one: initiating, direct, allergic to deliberation. Aries energy is the raw act of beginning, the spark before strategy. Ruled by Mars, it is framed in the tradition as courage in its unrefined state: fast to commit, fast to move, and largely uninterested in whether the ground has been surveyed.",
 s:"Initiative, courage, honesty, momentum",gr:"Patience; finishing what was begun; considering the second-order consequence"},
{n:"Taurus",g:"♉",from:[4,20],to:[5,20],el:"Earth",mo:"Fixed",ru:"Venus",po:"Yin",kw:"I have",body:"Neck and throat",
 d:"Fixed earth: the principle of consolidation. Where Aries starts, Taurus builds something that lasts and then declines to move it. Venus-ruled, it is associated with the senses — food, texture, music, the physical pleasure of a well-made thing — and with a stubbornness the tradition treats as the shadow side of reliability.",
 s:"Steadiness, patience, loyalty, practical skill",gr:"Flexibility; releasing what has outlived its use; distinguishing security from stagnation"},
{n:"Gemini",g:"♊",from:[5,21],to:[6,20],el:"Air",mo:"Mutable",ru:"Mercury",po:"Yang",kw:"I think",body:"Hands, arms, lungs",
 d:"Mutable air, ruled by Mercury: the sign of connection, language, and the restless traffic of ideas. Gemini is read as the mind in motion: curious, quick, comfortable holding two contradictory positions long enough to examine both. Its classical weakness is dispersal: many beginnings, shallow roots.",
 s:"Curiosity, wit, adaptability, communication",gr:"Depth over breadth; following one thread to its end; stillness"},
{n:"Cancer",g:"♋",from:[6,21],to:[7,22],el:"Water",mo:"Cardinal",ru:"Moon",po:"Yin",kw:"I feel",body:"Chest and stomach",
 d:"Cardinal water, ruled by the Moon: the sign of home, memory, and protection. Cancer initiates through care rather than force — it makes a container and defends it. The tradition gives it the crab's shell deliberately: great tenderness kept behind armour, and a long memory for who was safe and who was not.",
 s:"Loyalty, empathy, memory, protectiveness",gr:"Letting the shell open; not confusing withdrawal with safety; releasing old injuries"},
{n:"Leo",g:"♌",from:[7,23],to:[8,22],el:"Fire",mo:"Fixed",ru:"Sun",po:"Yang",kw:"I will",body:"Heart and spine",
 d:"Fixed fire, ruled by the Sun: the only sign whose ruler is the light itself. Leo is read as sustained creative warmth: the capacity to hold a room, to give generously, to make. Its classical fault is needing the warmth returned; the tradition's counsel is that the fire must burn whether or not anyone is watching.",
 s:"Generosity, courage, creativity, loyalty",gr:"Giving without requiring an audience; humility; sharing the centre"},
{n:"Virgo",g:"♍",from:[8,23],to:[9,22],el:"Earth",mo:"Mutable",ru:"Mercury",po:"Yin",kw:"I analyse",body:"Digestion and nerves",
 d:"Mutable earth under Mercury: discernment applied to material things. Virgo is the sign of craft, refinement, and useful service: the impulse to take something functional and make it correct. Its shadow in the tradition is the critical faculty turned inward without mercy, and a perfectionism that mistakes flaw-finding for care.",
 s:"Precision, diligence, service, discernment",gr:"Self-mercy; accepting the good-enough; trusting others' competence"},
{n:"Libra",g:"♎",from:[9,23],to:[10,22],el:"Air",mo:"Cardinal",ru:"Venus",po:"Yang",kw:"I balance",body:"Kidneys and lower back",
 d:"Cardinal air, ruled by Venus: the sign of relationship, proportion, and justice; its symbol is the only inanimate one in the zodiac, a set of scales. Libra initiates through others, weighing and harmonising. The classical warning is indecision: the scales that never settle, and peace kept at the cost of the truth.",
 s:"Fairness, diplomacy, aesthetic sense, partnership",gr:"Deciding; tolerating conflict; keeping one's own counsel in company"},
{n:"Scorpio",g:"♏",from:[10,23],to:[11,21],el:"Water",mo:"Fixed",ru:"Mars (traditional) · Pluto (modern)",po:"Yin",kw:"I desire",body:"Reproductive and eliminative systems",
 d:"Fixed water: emotion under pressure, held rather than expressed. Scorpio is the sign of depth, intensity, and transformation; the tradition assigns it everything hidden: death, inheritance, sexuality, what is buried and what is unearthed. Its faults are named as suspicion and the long grudge; its gift is the refusal to look away.",
 s:"Depth, loyalty, resilience, penetrating insight",gr:"Trust; releasing control; forgiving rather than filing away"},
{n:"Sagittarius",g:"♐",from:[11,22],to:[12,21],el:"Fire",mo:"Mutable",ru:"Jupiter",po:"Yang",kw:"I seek",body:"Hips and thighs",
 d:"Mutable fire under Jupiter: the sign of the search: travel, philosophy, meaning, the horizon. Sagittarius is read as the impulse to widen the frame, to ask what it all amounts to. Its classical excess is the tactless truth and the promise made larger than the promiser: enthusiasm outrunning follow-through.",
 s:"Optimism, honesty, vision, love of learning",gr:"Tact; keeping commitments; finding the infinite in what is near"},
{n:"Capricorn",g:"♑",from:[12,22],to:[1,19],el:"Earth",mo:"Cardinal",ru:"Saturn",po:"Yin",kw:"I use",body:"Bones, knees, skin",
 d:"Cardinal earth, ruled by Saturn: structure, ambition, and the long view. Capricorn initiates by building institutions that outlast the builder — the tradition associates it with mastery earned slowly, authority, and time itself. Its shadow is coldness and the reduction of a life to its output.",
 s:"Discipline, endurance, responsibility, strategy",gr:"Warmth; rest without guilt; measuring life by more than achievement"},
{n:"Aquarius",g:"♒",from:[1,20],to:[2,18],el:"Air",mo:"Fixed",ru:"Saturn (traditional) · Uranus (modern)",po:"Yang",kw:"I know",body:"Ankles and circulation",
 d:"Fixed air: despite the water-bearer's imagery, an air sign throughout the tradition. Aquarius holds ideas with the tenacity Taurus holds ground: the reformer, the systems-thinker, loyal to principle and to humanity in the collective. Its named fault is detachment: loving the many while remaining cool to the one in front of you.",
 s:"Originality, principle, humanitarian vision, independence",gr:"Intimacy; warmth toward individuals; questioning one's own certainties"},
{n:"Pisces",g:"♓",from:[2,19],to:[3,20],el:"Water",mo:"Mutable",ru:"Jupiter (traditional) · Neptune (modern)",po:"Yin",kw:"I believe",body:"Feet and lymphatic system",
 d:"Mutable water, the last sign — the dissolution of boundaries back into the whole. Pisces is given compassion, imagination, mysticism, and art; the tradition treats it as the most permeable sign, absorbing whatever surrounds it. Its shadows are escapism and the loss of self in others' needs.",
 s:"Compassion, imagination, intuition, forgiveness",gr:"Boundaries; facing what is; distinguishing empathy from absorption"}];

const A_HISTORY=[
["Babylon: the first records","Systematic sky-watching begins in Mesopotamia. Babylonian scribes kept omen records for centuries, the <em>Enūma Anu Enlil</em> collects some seventy tablets of them, reading celestial events as messages concerning the king and the state, not the individual. By roughly the fifth century BCE the zodiac had been divided into the twelve equal thirty-degree segments still used today, and the first personal birth charts appear."],
["Hellenistic Egypt: the system takes shape","In Alexandria, Babylonian records met Greek geometry and philosophy, and between roughly the second century BCE and the second century CE nearly everything modern astrology uses was assembled: the houses, the aspects, the rulerships, the ascendant. Ptolemy's <em>Tetrabiblos</em> (2nd century CE) became the standard reference for well over a millennium."],
["The Islamic world: preservation and refinement","From the eighth century, scholars working in Arabic translated, corrected, and extended the Greek material. Abu Ma'shar, Al-Kindi, and Māshā'allāh advanced the technical apparatus considerably, and their work — alongside genuine advances in observational astronomy — returned to Europe through Spain and Sicily."],
["Medieval and Renaissance Europe","Astrology became a university subject, taught alongside medicine and astronomy, which were not then separate disciplines. Physicians consulted charts before treatment; courts retained astrologers. Kepler cast horoscopes while discovering the laws of planetary motion — and was openly sceptical of much of the practice he earned his living by."],
["The split and the return","The Scientific Revolution severed astrology from astronomy, and it left the universities. It returned in the twentieth century in a different key: Alan Leo simplified it for a mass audience, newspaper sun-sign columns appeared in the 1930s, and Dane Rudhyar recast the whole system as psychological and symbolic rather than predictive: the frame most contemporary practitioners work in."]];

const A_ELEMENTS=[
["Fire","Aries · Leo · Sagittarius","Spirit, will, enthusiasm. Fire signs are read as outward-moving and self-igniting, motivated by possibility, impatient with delay."],
["Earth","Taurus · Virgo · Capricorn","Body, matter, results. Earth signs are read as practical and consolidating: trusting what can be measured, built, and maintained."],
["Air","Gemini · Libra · Aquarius","Mind, language, relation. Air signs are read as connective and abstracting, living among ideas and between people."],
["Water","Cancer · Scorpio · Pisces","Feeling, memory, depth. Water signs are read as receptive and merging: attuned to undercurrents and to what is unsaid."]];

const A_MODES=[
["Cardinal","Aries · Cancer · Libra · Capricorn","The four signs that open the seasons. Read as initiating: they start things, set direction, and prefer to lead."],
["Fixed","Taurus · Leo · Scorpio · Aquarius","The signs at each season's height. Read as sustaining: they hold, deepen, and resist being moved."],
["Mutable","Gemini · Virgo · Sagittarius · Pisces","The signs where seasons turn. Read as adapting: they translate, adjust, and dissolve one state into the next."]];

const A_PLANETS=[
["☉ Sun","Identity, vitality, purpose","The core self and conscious will, what the tradition calls the life-principle. Rules Leo.","~1 month per sign"],
["☽ Moon","Emotion, instinct, need","The inner life, habit, and what makes one feel safe. Rules Cancer.","~2.5 days per sign"],
["☿ Mercury","Mind, speech, exchange","How one thinks, learns, and communicates. Rules Gemini and Virgo.","~3 weeks per sign"],
["♀ Venus","Love, value, beauty","What one is drawn to and how one relates. Rules Taurus and Libra.","~1 month per sign"],
["♂ Mars","Drive, courage, conflict","How one acts, desires, and fights. Rules Aries (and Scorpio traditionally).","~6–7 weeks per sign"],
["♃ Jupiter","Expansion, meaning, fortune","Growth, philosophy, and generosity of scope. Rules Sagittarius (and Pisces traditionally).","~1 year per sign"],
["♄ Saturn","Structure, limit, time","Discipline, maturity, and the lessons of constraint. Rules Capricorn (and Aquarius traditionally).","~2.5 years per sign"],
["♅ Uranus","Disruption, freedom, invention","Sudden change and the breaking of pattern. Modern ruler of Aquarius.","~7 years per sign"],
["♆ Neptune","Dissolution, dream, compassion","Imagination, mysticism, and illusion. Modern ruler of Pisces.","~14 years per sign"],
["♇ Pluto","Transformation, power, depth","Death and renewal; what is buried and what erupts. Modern ruler of Scorpio.","~12–30 years per sign"]];

const A_HOUSES=[
["First: the Ascendant","Self, body, appearance, the manner of arriving. The cusp is the rising sign, set by the exact birth minute."],
["Second","Resources, possessions, income, and the sense of one's own worth."],
["Third","Communication, siblings, short journeys, early learning, the immediate neighbourhood."],
["Fourth: the IC","Home, roots, family of origin, the private foundation beneath a life."],
["Fifth","Creativity, play, romance, children — what is made for the joy of making it."],
["Sixth","Work, routine, health, service; the daily maintenance of a life."],
["Seventh — the Descendant","Partnership, marriage, close alliances, and open enemies. The mirror of the first."],
["Eighth","Shared resources, inheritance, sexuality, death and transformation."],
["Ninth","Philosophy, higher learning, long journeys, religion, meaning."],
["Tenth: the Midheaven","Vocation, public standing, authority, what one is known for."],
["Eleventh","Friendship, community, alliances, hopes for the future."],
["Twelfth","The hidden: solitude, the unconscious, retreat, what is undone or surrendered."]];

const A_ASPECTS=[
["Conjunction","0°","~8°","Two bodies at the same point. Fusion: their natures blend and intensify, for better or worse."],
["Sextile","60°","~6°","Two signs apart. Opportunity: easy cooperation, but one that must be taken up deliberately."],
["Square","90°","~8°","Three signs apart. Friction, tension, and the engine of growth — the aspect that forces action."],
["Trine","120°","~8°","Four signs apart, same element. Natural flow and talent: so easy it can go unused."],
["Opposition","180°","~8°","Opposite signs. Polarity: a tension between two valid needs, resolved only by balancing them."]];

const A_HOWTO=[
["Gather the three facts","Date, exact time, and place of birth. The date fixes the planets, the place fixes the horizon, and the time fixes the houses: a few minutes' error can move the Ascendant into the next sign. Without a birth time, the houses and the Moon's degree remain uncertain."],
["Find the big three","The Sun (core identity), the Moon (inner life), and the Ascendant (manner and approach). Most of what a chart says at a glance is held in these three, and the tradition treats them as the working summary."],
["Locate each planet by sign and house","Sign describes the <em>style</em> of a function; house describes the <em>arena</em> it plays out in. Mars in Libra in the tenth is read very differently from Mars in Aries in the fourth: the same drive, differently coloured and differently placed."],
["Map the aspects","Draw the angles between planets. Which are in tension (squares, oppositions) and which support one another (trines, sextiles)? Aspects are where a chart stops being a list and becomes an argument between its parts."],
["Weigh the balances","Count the elements and modalities. Heavy in fire and light in earth? Overwhelmingly fixed? The tradition reads what is missing as attentively as what is present: the absent element is often where the work lies."],
["Read the whole before the parts","The classical warning is against interpreting a single placement in isolation. A chart is a system: one hard aspect may be answered elsewhere by an easy one, and any factor can be reinforced or contradicted by the rest."]];

const A_RELATIONS=[
["Same element (trine)","Signs four apart share an element — Aries/Leo/Sagittarius, Taurus/Virgo/Capricorn, Gemini/Libra/Aquarius, Cancer/Scorpio/Pisces. The tradition reads these as the easiest pairings: instinctive understanding, shared tempo, and the risk that nothing ever challenges either party."],
["Same modality (square or opposition)","Signs three apart share a modality and are read as friction: two cardinal signs both wanting to lead, two fixed signs both refusing to move, two mutable signs both changing shape. Classically the most difficult and the most productive combination."],
["Opposite signs","Six apart, always the same modality and complementary elements: Aries/Libra, Taurus/Scorpio, Gemini/Sagittarius, Cancer/Capricorn, Leo/Aquarius, Virgo/Pisces. Read as the axis: each holds what the other lacks, and the pairing works exactly to the degree both stop insisting they are right."],
["Compatible elements","Fire warms air and air feeds fire; earth holds water and water softens earth. The tradition treats fire/air and earth/water as natural affinities, and fire/water or earth/air as needing deliberate translation."],
["Adjacent signs","Neighbours share no element or modality and form no classical aspect. Read as blind to one another — not hostile, simply operating on different assumptions, which the tradition says must be learned rather than felt."]];
