import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ArticleList } from "./ArticleList";
import * as api from "../../api/api";
import { BrowserRouter as Router } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

jest.mock("../../api/api", () => ({
  getArticles: jest.fn(),
  favoriteAnArticle: jest.fn(),
}));

jest.mock("../../contexts/UserContext", () => ({
  useUser: jest.fn(),
}));

describe("ArticleList", () => {
  const mockArticles = [
    {
      author: {
        bio: "I am Alice",
        following: false,
        image: "",
        username: "alice",
      },
      body: 'Last December 7, Michael Savage kicked off his radio program by railing yet again against the "demonic" and "fascist" governors who had locked down their states to slow the spread of COVID. Yet on that day, the host of *The Savage Nation* launched a new line of attack inspired by the anniversary of the bombing of Pearl Harbor---and the United States\' reaction to it. Broadcasting from his home in Northern California, where a strict new stay-at-home order had just gone into effect, Savage declared that his and other blue states had been turned into "Democrat-run prison camps" whose residents were living under "undeclared martial law." "We have gone from Japanese internment to lockdowns and curfews without so much as anyone screaming," he said.\n\nRiffing on this tendentious analogy, Savage said he hoped that the governors of California and New York "don\'t declare their states military areas from which any or all persons may be excluded"---a reference to [the orders](https://encyclopedia.densho.org/Western_Defense_Command/) that led to 110,000 Japanese Americans being forced into concentration camps during World War II. "Maybe they\'ll deport us from our own state, making it safe only for Mexican illegal aliens so they could have 100 percent and absolute freedom to do what they want."\n\nThe harangue thinly disguised as a history lesson was typical of Savage, a right-wing shock jock whose 27-year career has [left a trail of racist, xenophobic, and homophobic comments](https://www.motherjones.com/politics/2021/04/michael-savage-donald-trump-presidio-trust-san-francisco/#1). But the pseudonymous talker (real name: [Michael A. Weiner](https://www.salon.com/2003/03/05/savage_11/)) wasn\'t simply mouthing off as his on-air persona; he was about to enlist his audience in a battle he\'d been waging in his side gig as a public servant.\n\nLast May, President Donald Trump named Savage to the board of directors of the [Presidio Trust](https://www.presidio.gov/), the federal corporation that runs the nearly 1,200-acre urban park at the foot of San Francisco\'s Golden Gate Bridge. In a normal year, as many as 10 million visitors enjoy the Presidio\'s stunning views, forests, wetlands, and historic sites. For more than a century, this prime real estate had been an US Army base; in 1994, the Pentagon handed it over to the National Park Service. When his appointment was first announced, Savage said that one of his goals would be to "remind the public of the military significance" of the site. Yet throughout the fall of 2020, Savage had been working behind the scenes to use his new position to try to downplay an inglorious chapter of that history: the former base\'s inarguable connection to the forced removal and detention of Japanese Americans during World War II. That abuse of power, set in motion by a 1942 [executive order](https://encyclopedia.densho.org/Executive_Order_9066/) signed by President Franklin D. Roosevelt, was carried out through [more than 100](https://www.presidio.gov/presidio-trust/press/exclusion-the-presidios-role-in-world-war-ii-japanese-american-incarceration) military exclusion orders issued [from the Presidio](https://encyclopedia.densho.org/Western_Defense_Command/)---orders just like those Savage had alluded to on the air.',
      createdAt: "2021-04-08T00:00:00.000Z",
      description:
        "Michael Savage used his position at San Francisco’s Presidio to stir up a controversy over Japanese American internment.",
      favorited: false,
      favoritesCount: 0,
      slug: "michael-savage-donald-trump-presidio-trust-san-francisco",
      tagList: ["politics"],
      title: "Trump Put a Right-Wing Radio Host in Charge of a National Park. Emails Show the Chaos That Ensued.",
      updatedAt: "2026-05-07T14:21:56.204Z",
    },
    {
      author: {
        bio: "I am Alice",
        following: false,
        image: "",
        username: "alice",
      },
      body: 'When socialite and former model Aviva Drescher learned in the fall of 2011 that she had been cast on season five of *The Real Housewives of New York City*, she was eager to put her best face forward. "I knew I was going to be on a reality television show, and I had just heard about the fantastic and extraordinary Fred Brandt. If I was going to be on TV, I really had to go to the best of the best," she said. Like anyone who sought an appointment with the dermatologist known as the "Baron of Botox," Drescher called in a favor. When she arrived at Dr. Brandt\'s pristine offices on the far side of East 34th Street, an intentionally unchic part of Manhattan where patients were less likely to run into acquaintances, she did what everyone who went to see Dr. Brandt did: She waited, sometimes for hours.\n\nAn appointment with the man who had personally perfected the faces of celebrities like Madonna, Gwyneth Paltrow, and Kelly Ripa was well worth it --- as was the cost, which could easily exceed $7,000 in a single visit. Drescher soon became a devotee, regularly allowing Brandt to determine where, and how, her face could benefit from a vial of Botox --- or, as the doctor lovingly called it, "a bissel of Bo."\n\nAmericans spent more than $16.5 billion on cosmetic procedures in 2018, but when Fredric Brandt first opened up shop in the early 1980s, there were few alternatives to going under the knife. Botox, a nerve-freezing substance originally used to alleviate twitchy eyelids, became Brandt\'s paintbrush, a way to gently redesign a face by manipulating the muscles under the skin. What he was able to achieve over the course of his 35-year career wasn\'t just a new way to use Botox and fillers---it was a new way to talk to women about what they saw when they looked in the mirror. Fred Brandt took the once-dirty desire to look beautiful and rebranded it as an appropriate and acceptable form of self-care.\n\n"Nobody wants to look older than their age, and no one wants to grow old gracelessly," said Linda Wells, the founding editor of *Allur*e and a longtime Brandt client. "We all knew what we were getting into by going and getting these things done, but Fred managed to make everybody feel like this was normal."\n\nA visit with the Baron of Botox was a cross between therapy and theater. He listened when a patient had a personal problem and was always empathetic. To distract from the discomfort of needle sticks, he sang show tunes and made jokes, often smothering the punchline with his warm, honking laugh. He would examine each face before he began his work, perhaps injecting the vertical lines between the eyebrows with Botox before switching to a filler like Restylane or Voluma, which he would place just sobelow the brow to lift and open the face. Unlike the "[rootless exoticism](https://www.newyorker.com/culture/decade-in-review/the-age-of-instagram-face)" of today\'s Instagram Face---a flattened, poreless look inspired by celebrities like Bella Hadid and Kendall Jenner---Brandt favored refined features that enhanced an individual\'s face without any overt suggestion of intervention. Aviva Drescher, who has platinum-blonde hair and round, high cheeks, already resembled Grace Kelly. After a few well-placed injections from Brandt, even her husband thought she looked like a prettier version of herself. "Fred really looked at me as though I was a work of art," she said. "And he was going to improve me."\n\nBrandt was also obsessed with the physiology of beauty. He would frequently experiment on his own face, injecting Botox into his neck or placing dots of filler under his cheekbones, staring in the mirror until he was satisfied. Then he\'d fill the wastebasket with empty syringes and bloody gauze and go to bed. "He didn\'t do to his patients whatever he was doing to himself," Drescher said. "He wanted perfection," said his friend and celebrity hairstylist Garren Defazio. "Everything he did was to be perfected."\n\n![F](https://miro.medium.com/max/198/1*3AmxisdoEwKe0Yv4qRO3Sw.jpeg)Fredric Sheldon Brandt was born on June 26, 1949, in Newark, New Jersey, the second son of Esther, a bookkeeper, and Irving Brandt, a veteran who had served as a private first-class during World War II. Together, the Brandts ran a candy store in the predominantly Jewish neighborhood of Irvington, a few miles outside of Newark. The candy store, and young Fred\'s affinity for sweets, would later serve as anecdotal fodder for his famously disciplined lifestyle. He wrote in his 2007 beauty guide, *10 Minutes/10 Years*, "My father was a diabetic who didn\'t take care of himself or modify his diet as well as he could have, and he died way too young from renal failure." Irving Brandt passed away in 1965 when Brandt was only 15 years old; his mother died just six years later, leaving 22-year-old Fred to fend for himself.\n\nIn high school, Fred --- or "Freddy," as he was known then --- was in the debate club and on the political science team. "He was very bright," recalled his former classmate Alvin Felzenberg, who played Brutus to Brandt\'s Julius Caesar in sixth grade. "I\'m sure he had straight As. I\'d be shocked if he had an A-minus or a B-plus in anything." Freddy was also private, avoiding his classmates\' questions about his family. "There was a general sense among those close to Fred that the household he grew up in was not a very nurturing one," Lili Anolik wrote in a [2015 *Vanity Fair* profile of Brandt](https://www.vanityfair.com/style/2015/08/dr-brandt-death-celebrity-botox) after his death. "He didn\'t want anyone talking about his family --- ever," Felzenberg said.',
      createdAt: "2020-01-14T00:00:00.000Z",
      description:
        "Dr. Fredric Brandt redefined cosmetic dermatology forever by bringing a smooth, plump, and ageless face to the masses",
      favorited: true,
      favoritesCount: 1,
      slug: "the-baron-of-botox-is-gone-but-his-face-lives-on",
      tagList: ["beauty", "culture"],
      title: "The Baron of Botox Is Gone, But His Face Lives On",
      updatedAt: "2026-05-07T14:21:56.151Z",
    },
    {
      author: {
        bio: "I am Bob",
        following: false,
        image: "",
        username: "bob",
      },
      body: "I've always been aware of being an inconsistent personality. Of having a lot of contradictory voices knocking around my head. As a kid, I was ashamed of it. Other people seemed to feel strongly about themselves, to know exactly who they were. I was never like that. I could never shake the suspicion that everything about me was the consequence of a series of improbable accidents---not least of which was the 400 trillion--to-one accident of my birth. As I saw it, even my strongest feelings and convictions might easily be otherwise, had I been the child of the next family down the hall, or the child of another century, another country, another God. My mind wandered.\n\nTo give a concrete example: if the Pakistani girl next door happened to be painting *mehndi* on my hands---she liked to use me for practice---it was the work of a moment to imagine I was her sister. I'd envision living with Asma, and knowing and feeling the things she knew and felt. To tell the truth, I rarely entered a friend's home without wondering what it might be like to never leave. That is, what it would be like to be Polish or Ghanaian or Irish or Bengali, to be richer or poorer, to say these prayers or hold those politics. I was an equal-opportunity voyeur. I wanted to know what it was like to be everybody. Above all, I wondered what it would be like to believe the sorts of things I didn't believe. Whenever I spent time with my pious Uncle Ricky, and the moment came for everyone around the table to bow their heads, close their eyes, and thank God for a plate of *escovitch* fish, I could all too easily convince myself that I, too, was a witness of Jehovah. I'd see myself leaving the island, arriving in freezing England, shivering and gripping my own mother's hand, who was---in this peculiar fictional version---now my older sister.\n\nI don't claim I imagined any of this correctly---only compulsively. And what I did in life, I did with books. I lived in them and felt them live in me. I felt I *was* Jane Eyre and Celie and Mr. Biswas and David Copperfield. Our autobiographical coordinates rarely matched. I'd never had a friend die of consumption or been raped by my father or lived in Trinidad or the Deep South or the nineteenth century. But I'd been sad and lost, sometimes desperate, often confused. It was on the basis of such flimsy emotional clues that I found myself feeling with these imaginary strangers: feeling with them, for them, alongside them and through them, extrapolating from my own emotions, which, though strikingly minor when compared to the high dramas of fiction, still bore some relation to them, as all human feelings do. The voices of characters joined the ranks of all the other voices inside me, serving to make the idea of my \"own voice\" indistinct. Or maybe it's better to say: I've never believed myself to have a voice entirely separate from the many voices I hear, read, and internalize every day.",
      createdAt: "2019-10-24T00:00:00.000Z",
      description:
        "We have found fiction wanting in myriad ways but rarely paused to wonder, or recall, what we once wanted from it.",
      favorited: false,
      favoritesCount: 0,
      slug: "zadie-smith-in-defense-of-fiction",
      tagList: ["culture", "fiction"],
      title: "Fascinated to Presume: In Defense of Fiction",
      updatedAt: "2026-05-07T14:21:56.252Z",
    },
  ];

  beforeEach(() => {
    useUser.mockReturnValue({ user: null });
    api.getArticles.mockResolvedValue({ articles: mockArticles, articlesCount: mockArticles.length });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders article list and fetches articles", async () => {
    render(
      <Router>
        <ArticleList />
      </Router>
    );

    expect(screen.getByText("conduit")).toBeInTheDocument();
    expect(screen.getByText("A place to share your knowledge.")).toBeInTheDocument();

    await waitFor(async () => {
      expect(api.getArticles).toHaveBeenCalledTimes(1);
      expect(
        await screen.findByText(
          "Trump Put a Right-Wing Radio Host in Charge of a National Park. Emails Show the Chaos That Ensued."
        )
      ).toBeInTheDocument();
      expect(
        await screen.findByText(
          "Michael Savage used his position at San Francisco’s Presidio to stir up a controversy over Japanese American internment."
        )
      ).toBeInTheDocument();
      expect(await screen.findByText("The Baron of Botox Is Gone, But His Face Lives On")).toBeInTheDocument();
      expect(
        await screen.findByText(
          "Dr. Fredric Brandt redefined cosmetic dermatology forever by bringing a smooth, plump, and ageless face to the masses"
        )
      ).toBeInTheDocument();
      expect(await screen.findByText("Fascinated to Presume: In Defense of Fiction")).toBeInTheDocument();
      expect(
        await screen.findByText(
          "We have found fiction wanting in myriad ways but rarely paused to wonder, or recall, what we once wanted from it."
        )
      ).toBeInTheDocument();
    });
  });

  test("calls favoriteArticle API when like button is clicked for a logged-in user", async () => {
    useUser.mockReturnValue({ user: { username: "testuser", token: "jwt" } });
    api.favoriteAnArticle.mockResolvedValue({
      article: { ...mockArticles[0], favorited: true, favoritesCount: 1 },
    });

    render(
      <Router>
        <ArticleList />
      </Router>
    );

    const favoriteButtons = await screen.findAllByRole("button", { name: "favorite" });
    fireEvent.click(favoriteButtons[0]);

    await waitFor(() => {
      expect(api.favoriteAnArticle).toHaveBeenCalledWith(mockArticles[0].slug);
    });
  });
});
