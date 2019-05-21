import React from 'react';

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const adLines = [
  `Hair up, glasses off`,
  `You boys know how to shovel coal?`,
  `What do you expect, Mother? I'm half machine!`,
  `I'm a monster!`,
  `It's a good thing he's already got that little scooter`,
  `Heart attack never stopped old Big Bear`,
  `I didn't even know we were calling him Big Bear`,
  `You could charm the black off a telegram boy`,
  `Did you see the new Poof?`,
  `I love all of my children equally`,
  `No one's called him Baby Buster since high school`,
  `They didn't sneak into this country to be your friends`,
  `You were just a turd out there, you know?`,
  `We have unlimited juice?`,
  `This party is going to be off the hook`,
  `I hear the jury's still out on science`,
  `Like anyone would want to "R" her.`,
  `I'm going to run this through again on "pots and pans.`,
  `Can't a guy call his mother pretty without it seeming strange?`,
  `This is the best free scrapbooking class I've ever taken`,
  `Go ahead, touch the Cornballer`,
  `I'm going to run this through again on "pots and pans"`,
  `They want to break his legs`,
  `I've been in the film business for a while but I just can't seem to get one in the can`,
  `I will be a bigger and hairier mole than the one on your inner left thigh`,
  `I want to cry so bad, but I don't think I can spare the moisture`,
  `Maybe it was the other George Michael`,
  `I'm tired of trying to find happiness through lies and self-medicating`,
  `It's so watery, and yet there's a smack of ham to it`,
  `The seal is for marksmanship, and the gorilla is for sand racing`,
  `After all these years, God's not going to take a call from you`,
  `You mean the guy we're meeting with can't even grow his own hair?`,
  `I thought the two of us could talk man-on-man`,
  `I spent so much time making sweet love on my wife that it's hard to hear anything over the clatter of her breasts`,
  `You've been warned about touching`,
  `No touching`,
  `I think I maced a crane`,
  `Wine only turns to alcohol if you let it sit`,
  `I see you've wasted no time in filling my seat hole`,
  `I'm going to buy you the single healthiest call girl this town has ever seen`,
  `Turn this skiff around`,
  `I never thought I'd miss a hand so much`,
  `I can just taste those meaty leading man parts in my mout`,
  `Everyone's laughing and riding and cornholing except Buster`,
  `You can always tell a Milford man`,
  `Let me take off my assistant's skirt and put on my Barbra-Streisand-in-The-Prince-of-Tides ass-masking therapist pantsuit`,
  `I don't want no part of yo tight-ass country-club`,
  `Don't leave your Uncle T-Bag hanging`,
  `What have we always said is the most important thing?`,
  `We're just blowing through nap time, aren't we?`,
  `Let me give that oatmeal some brown sugar`,
  `A sea of waiters and no one will take a drink order.`,
  `Those are balls`,
  `I'm gonna build me an airport, put my name on it`,
  `Let me out that queen`,
  `Do these effectively hide my thunder?`,
  `You just grab that brownish area by its points and you don't let go no matter what your mother tells you`,
  `I guess you can say I'm buy-curious`,
  `The soup of the day is bread`,
  `I could use a leather jacket for when I'm on my hog and have to go into a controlled slide`,
  `Are you at all concerned about an uprising?`,
  `In the dark, it all looks the same`,
  `Look at us, crying like a bunch of girls on the last day of camp`,
  `You just made a fool out of yourself in front of T-Bone`,
  `I hope you also carry a spare bowl of candy beans`,
  `You can't just comb that out and reset it?`,
  `Look what the homosexuals have done to me`,
  `Everything they do is so dramatic and flamboyant, it just makes me want to set myself on fire`,
  `I may have committed some light treason`,
  `I don't understand the question and I won't respond to it`,
  `There's always money in the banana stand.`,
  `In this business of show, you have to have the heart of an angel and the hyde of an elephant`,
  `Too many lives have been ruined because some cheap waitress at a HoJo said she used an I.U.D.`,
  `Do you think I could have a hit of that juice box?`,
  `Suddenly he's too much of a big shot to brush Mother's hair`,
  `It walked on my pillow`,
  `That's not a spinner`,
  `I thought I saw a graham cracker out there`,
  `There's still plenty of meat on that bone`,
  `Now you take this home, throw it in a pot, add some broth, a potato`,
  `Baby, you got a stew going`,
  `Never once touched my per diem`,
  `Army had a half day`,
  `The mere fact that you call making love "pop pop" tells me that you're not ready`,
  `I'd have to get up pretty early in the morning to get drunk by 1 o' clock`,
  `There are dozens of us`,
  `I think you're going to be surprised at some of your phrasing`,
  `Stop licking my hand, you horse's ass`,
  `I'm afraid I just blue myself`,
  `Why don't we just take an ad out in "I'm Poor" magazine?`,
  `And that's why you always leave a note`,
  `It's not your fault your parents were cousins, but here we are`,
  `You're going to get some hop-ons`,
  `It just seems like there's still light coming in from under the door`,
  `I'm leaving my mother for you`,
  `You're replacing my mother`,
  `Even if it means me taking a chubby, I will suck it up`,
  `If she's not going to say anything, I certainly can't help her`,
  `I hate this doctor`,
  `That's like comparing apples and some fruit nobody's ever heard of`,
  `Is that what's going to happen to my hair?`,
  `Finally, some good news from this guy`,
  `There's no other way to take that`,
  `He's lost his left hand, so he's going to be all right`,
  `I cannot survive under the house`,
  `Perhaps an attic shall I seek`,
  `Don't call my escorts whores`,
  `Shall I knock Dad out and chain him to a pipe somewhere, or should I risk another herpes outbreak with Kitty?`,
  `He's definitely got a type`,
  `That's my son, you pothead`,
  `God knows they're squinters`,
  `Instead of making houses, maybe you should make land on the ocean`,
  `Maybe you're not smart either. I didn't know until they told me.`,
  `I've opened a door here that I regret`,
  `What's Spanish for "I know you speak English"?`,
  `You gave us cereal in an ashtray`,
  `My name is Judge`,
  `Why can't I have hair and money and him nothing?`,
  `There's the woman I'm sexually attracted to`,
  `I was trained by Army`,
  `I don't want to blame it all on 9/11, but it certainly didn't help`,
  `Annyong`,
  `Maybe I'll put it in her brownie`,
  `You can sink your arrow into my buttocks any time`,
  `I thought it was a pool toy`,
  `I wouldn't mind kissing that man between the cheeks`,
  `Are those police boats?`,
  `A trick is something a whore does for money`,
  `Illusions, Michael`,
  `Clearly the blue part is the land`,
  `I don't know what I expected`,
  `Huzzah!`,
  `It's a wonderful restaurant`,
  `Why are you squeezing me with your body?`,
  `He's going to be all right`,
  `I was set up by the Brits`,
  `Say something that will terrify me`,
  `I'll buy you a hundred George Michaels that you can teach to drive`,
  `I should be in this Poof`,
  `Did somebody say Wonder?`,
  `She turns illusions for money`,
  `Everything I've said about you can be covered with makeup and a lie about a thyroid problem`,
  `He just wants to see boys' Linuses`,
  `Half your testicle was hanging out of that thing`,
  `Give me an old pro like a Robert Redford`,
  `Give my son the juice`,
  `You look like the window of a butcher shop`,
  `You told me I wasn't fit to serve`,
  `They even touched my Charlie Browns`,
  `Man, it's tired in here`,
  `Make love in your own hand, mother`,
  `You see how he treats me just because he thinks I'm having an affair with the boy's uncle?`,
  `Sometimes love should be terrifying`,
  `My Army training tells me that this is going to be a hot mission`,
  `I don't date whores`,
  `It's just mom and whores`,
  `Can't you keep my hand to yourself?`,
  `Have you seen my rubber hand?`,
  `I've always loved those leathery little snappy faces`,
  `Soft and alive`,
  `It wasn't really the pronunciation that bothered me`,
  `My hook is stuck in the stair car`,
  `And that's why you don't use one-armed persons to teach lessons`,
  `He's a robot!`,
  `If the only thing I could do was lay in bed all day and eat soup, I'd be happy`,
  `I could just take it through a tube`,
  `Never let me die`,
  `When I miss your lips, I'll put a fig in my mouth`,
  `My love thinks I'm a coward just because I wasted precious hospital resources to avoid my legal obligation`,
  `I've always pictured him in a lighthouse`,
  `I need to be rubbing elbows, not working your fork`,
  `The ocean is my second biggest fear`,
  `I hope that's not a crack about my hair color, lips, forehead, nose and teeth because at least I'm not the wearing a round sweater set on my face`,
  `You're looking at balls here`,
  `I've seen the blood`,
  `Imagine the impact of that scene if it would appear just right after I'd turn the TV on`,
  `Cool your Japanese jets`,
  `You forgot to say "away" again`,
  `Look at the beak on that bird`,
  `I think the name Michael is making you look for a man`,
  `You can just say "intercourse"`,
  `We just say "manager"`,
  `Doesn't matter who`,
  `I'd rather be dead in California than alive in Arizona`,
  `Hot ham water`,
  `He's a regular Freddie Wilson, that one`,
  `Don't call it that`,
  `If you didn't have adult onset diabetes, I wouldn't mind giving you a little sugar`,
  `You don't want a hungry dove down your pants`,
  `That's how Tony Wonder lost a nut`,
  `Why go to a banana stand when we can make YOUR banana stand?`,
  `Don't worry, these young beauties have been nowhere near the bananas`,
  `And that's why you don't try to teach lessons to your father`,
  `We'll be the laughing stock of the boardwalk`,
  `If you feel something moving down there, it's just the bird`,
  `I might have you beaten with a pillowcase full of batteries`,
  `The guy runs a prison; he can have any piece of ass he wants`,
  `Who's the "her" in that sentence?`,
  `Please don't call yourself that`,
  `I don't know why I always assume that everyone has read my screenplay`,
  `I'm not going to spend this kind of money and not watch`,
  `He showers her with club sauce`,
  `You've never told me how many houses there are in the British Parliament`,
  `I think we could be more than just gym buddies`,
  `You're blowing my mind, Frank`,
  `The whole backside has moles`,
  `There's no "I" in "win"`,
  `Within her lies a queen`,
  `You can control your bladder when you're dead`,
  `I ought to pull down your pants and spank your ass raw`,
  `Why should you go to jail for a crime someone else noticed?`,
  `I was a professional twice over: an analyst and a therapist`,
  `The world's first analrapist`,
  `I shall drop you off alive, hooker or no`,
  `They're polite and the men all sound gay, but they will rip out your heart`,
  `I almost had Pop-Pop in Reno`,
  `If this tableau I recreate, perhaps I can re-snare my mate`,
  `I don't want anybody to go inside that musty claptrap`,
  `We were both waiting for our dads at that garden where the little boy found the arm`,
  `I kind of feel like that kid who found the severed hand`,
  `I don't see you crying, robot`,
  `Say goodbye to these`,
  `I promised myself I wasn't going to become one of those people who were always going on about their screenplays`,
  `Nobody sells any coke in this pen without daddy getting a taste`,
  `You haven't seen a little box with a turtle on it, have you?`,
  `My turtle was living in it before he ate all the grass and died`,
  `The scabs come right off`,
  `I can't say no to the woman who gave me chlamydia`,
  `People hear the name Tobias, they think big black guy`,
  `I just don't want people's kids getting their sticky little fingers all over these twenty-six hundred dollar pants`,
  `The guy who's dirty dancing with his niece is going to tell the guy in the thirty-six hundred dollar suit how to run the business. Come on.`,
  `Suddenly playing with yourself is a scholarly pursuit`,
  `If I wanted something your thumb touched, I'd eat the inside of your ear`,
  `You let him go in the sun?`,
  `Then why don't you marry an ice cream sandwich?`,
  `I will pack your sweet pink mouth with so much ice cream you'll be the envy of every Jerry and Jane on the block`,
  `I am having a love affair with this ice cream sandwich`,
  `Did you stick it to her?`,
  `Pop-Pop needs your hair`,
  `At least he's in prison, not an urn`,
  `You know the hair that no one's supposed to see?`,
  `Everyone put on white robes and outsmarted us`,
  `We shan't be telling your mother about this, shan't we?`,
  `Now there's somebody who needs a good mother`,
  `I'll leave when I'm good and ready`,
  `I need one of those necklaces in the shape of a T`,
  `There's a cream with real diamonds in it`,
  `You, sir, are a mouthful`,
  `If I can't find a horny immigrant by then, I don't deserve to stay here`,
  `There's a man inside me, and only when he's finally out can I walk free of pain`,
  `I'm afraid I prematurely shot my wad on what was supposed to be a "dry run", if you will, so I'm afraid I have something of a mess on my hands`,
  `I've made a huge mistake`,
  `You are playing adults with fully-formed libidos, not two young men playing grab-ass in the shower`,
  `I can't go on a million bike rides whenever you want me to`,
  `The doctor said there were claw marks on the walls of her uterus`,
  `It's like she gets off on being withholding`,
  `Look who's ragging on the old lady`,
  `Look at me, "getting off"`,
  `I always ended up on all fours`,
  `This kind of agility?`,
  `Do you see me more as the respected dramatic actor or more of the beloved comic actor?`,
  `I don't even want to tell you what she wouldn't let me do to her in the car`,
  `I thought you had class`,
  `Carl Weathers took everything from me`,
  `You could have been sleeping with Frightened Inmate #2`,
  `Some call me The Human Metronome.`,
  `So far it's been all chain and no ball`,
  `Not everything is strippers and booze and buckets of blood`,
  `You're out of the band`,
  `I've already got a Lucille in my life`,
  `Is this something society will allow?`,
  `I just jumped through a plate glass window on a date`,
  `I have been Googling your father`,
  `I sold you for a pack of cigarettes`,
  `You don't fire crazy`,
  `All these books are cooked`,
  `It's like a mind puzzle, an awesome mind puzzle`,
  `Talk you off of what, Pop-Pop?`,
  `Where once there was a yacht, now there is naught`,
  `Who doesn't love the Jews?`,
  `I was going to smoke the marijuana like a cigarette`,
  `They don't allow you to have bees in here`,
  `I think something laid eggs on me`,
  `Mother say no carbohydrate for you if you ever going to get girlfriend that's not old lady`,
  `Maybe we should kiss again to teach them a lesson about obvious`,
  `Look how he zips now`,
  `I should have never taken the pumps out of here`,
  `You just can't deal with the fact that I've got a super-thin wife with huge cans`,
  `Did you know that you can get a refill on any drink you want here, and it's free?`,
  `Aren't you the sweetest thing, spending some time with what's left of your uncle`,
  `He couldn't wait to swoop in and throw on the sailor suit`,
  `I got children all over town`,
  `My father is my uncle`,
  `That's the kind of joke he would have loved`,
  `Who'd like a banger in the mouth?`,
  `We just call it a sausage`,
  `Franklin said some things Whitey just wasn't ready to hear`,
  `I forgot that we were in the colonies`,
  `Take me to your secular world`,
  `My socks are wet`,
  `Me quick, want slow`,
  `Tea for dong!`,
  `I'd want to get in there and find some answers`,
  `Excuse me for liking the way they shape my junk`,
  `It's not just going to be my love and George Michael's, but God's love as well`,
  `Can it open a can?`,
  `A seal didn't bite your Linus off, right?`,
  `No, a seal didn't bite my Linus off`,
  `Up yours, granny!`,
  `You couldn't handle it!`,
  `Seems like only yesterday you were bursting forth from your mother's fertile womb`,
  `You don't see me nervous about being on my third Virgin Mary`,
  `You are a worse psychiatrist than you are a son-in-law, and you will never get work as an actor because you have no talent`,
  `I had no idea a ninety year-old man could cave in my chest cavity like that`,
  `I think your knee is on my heart`,
  `I'm afraid I prematurely shot my wad on what was supposed to be a dry run, if you will`,
  `I'm going to see if I can get a wrench to strip my nuts`,
  `I haven't had a massage since prison`,
  `He's an alpaca`,
  `One of this guy's eyebrows just fell in the bowl of candy beans`,
  `I think George Michael is hiding Ann in the attic`,
  `It's as Ann as the nose on plain's face`,
  `I have Pop-Pop in the attic`,
  `Who wants to go to the hospital?`,
  `That was 100% inappropriate, and I do apologize profusely`,
  `I ought to point to Uncle Oscar's Charlie Browns next time you're on top of him, Mother`,
  `I figured if I blue myself early I'd be nice and relaxed for a nine o'clock dinner reservation`,
  `I can actually smear diamonds on my face, and it's only $400 a tub`,
  `She calls it a 'mayon-egg'`,
  `Mom volunteered me for the Army just because the fat man dared her to`,
  `The tears just aren't coming`,
  `You mean you can wear stripper clothes when you're not stripping?`,
  `You could hump that hood`,
  `What a fun sexy time for you`,
  `What I'm calling you is a television actor`,
  `There's only one man I've ever called a coward, and that's Brian Doyle Murray`,
  `We do not wag our genitals at one another to make a point`,
  `It's a mainstay of the magician's toolkit, like how clowns always have a rag soaked in ether`,
  `The worst that could happen is that I could spill coffee all over this $3,000 suit`,
  `I came out of you, he didn't`,
  `I liked it better when he just said Annyong`,
  `Maybe it was the eleven months he spent in the womb`,
  `You dont cry when you take those off?`,
  `How many times I gotta tell this kid chicken wings?`,
  `Somebody is a rude Gus`,
  `I can't even fake the death of a stripper`,
  `You didn't eat that dove, did you?`,
  `If someone had left a note, this innocent man would still have his arm`,
  `You'd think a man locked up in prison would able to abstain.`,
  `Your father with his disgusting tweaking`,
  `I couldn't breast feed any of you kids because of that man`,
  `First you dump all over it, now you want to know how it's done`,
  `I feel like the prettiest girl at the dance`,
  `I need to go take down the buffet and set up the leather pony`,
  `They cannot arrest a husband and wife for the same crime`,
  `Say what you want about America - thirteen bucks can still get you a hell of a lot of mice`,
  `Who said anything bad about America?`,
  `So I'm thinking of getting a motorcycle`,
  `Your legs look exactly like mine, and I just shaved mine`,
  `I'm looking for something that says "Dad likes leather"`,
  `You have to be some sort of she-hulk to get this`,
  `Mom, you're ruining our fort`,
  `Who'd want to mess with any of us?`,
  `Trying to introduce some edge to the whole palette`,
  `Is she the one who's going to take him to the dentist?`,
  ``,
  ``,
];

const Generator = class {
  constructor() {
    this.lines = [...adLines];
    this.indexTotal = this.lines.length - 1;
  }
};
const generator = new Generator();

export const getLine = (maxWords = 5000, minWords = 0, noPunc) => {
  let lineArray = generator.lines.filter(line => {
    let split = line.split(' ');
    let allowed = split.length >= minWords && split.length <= maxWords;
    return allowed;
  });
  let max = lineArray.length - 1;
  // console.orange('selecting from', max, 'maxWords', maxWords, 'lines.')
  let rando = randomInt(0, max);
  let headline = lineArray[rando];
  let endChar = headline[headline.length - 1];
  let addendum = '';
  if (!noPunc && endChar !== '.' && endChar !== '?' && endChar !== '!') {
    addendum = '.';
  }
  generator.lines.splice(generator.lines.indexOf(headline), 1);
  if (generator.lines.length === 1) {
    generator.lines = [...adLines];
  }
  return headline + addendum;
};
export const getParagraph = lineArgs => {
  let paragraph = '';
  lineArgs.map(args => {
    paragraph += ' ' + getLine([...args]);
  });
  return <span>{paragraph}</span>;
};