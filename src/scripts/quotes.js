// import React from 'react';

export const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const adLines = [
  `Hair up, glasses off`,
  `You boys know how to shovel coal?`,
  `What do you expect, Mother? I'm half machine!`,
  `I'm a monster!`,
  `It's a good thing he's already got that little scooter`,
  `A heart attack never stopped old Big Bear`,
  `I didn't even know we were calling him Big Bear`,
  `You could charm the black off a telegram boy`,
  `Did you see the new Poof?`,
  `I love all of my children equally`,
  `No one's called him Baby Buster since high school`,
  `They didn't sneak into this country to be your friends`,
  `You were just a turd out there, you know?`,
  `This party is going to be off the hook`,
  `I hear the jury's still out on science`,
  `Like anyone would want to "R" her`,
  `Can't a guy call his mother pretty without it seeming strange?`,
  `This is the best free scrapbooking class I've ever taken`,
  `Go ahead, touch the Cornballer`,
  `I'm going to run this through again on "pots and pans"`,
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
  `I can just taste those meaty leading man parts in my mouth.`,
  `Everyone's laughing and riding and cornholing except Buster`,
  `You can always tell a Milford man`,
  `Let me take off my assistant's skirt and put on my Barbra-Streisand-in-The-Prince-of-Tides ass-masking therapist pantsuit`,
  `I don't want no part of yo tight-ass country-club`,
  `Don't leave your Uncle T-Bag hanging`,
  `What have we always said is the most important thing?`,
  `We're just blowing through nap time, aren't we?`,
  `Let me give that oatmeal some brown sugar`,
  `A sea of waiters and no one will take a drink order`,
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
  `There's always money in the banana stand`,
  `In this business of show, you have to have the heart of an angel and the hyde of an elephant`,
  `Too many lives have been ruined because some cheap waitress at a HoJo said she used an I.U.D.`,
  `Do you think I could have a hit of that juice box?`,
  `Suddenly he's too much of a big shot to brush Mother's hair`,
  `It walked on my pillow`,
  `That's not a spinner`,
  `I thought I saw a graham cracker out there`,
  `There's still plenty of meat on that bone`,
  `Now you take this home, throw it in a pot, add some broth, a potato`,
  `You take this home, throw it in a pot, add some broth, a potato — baby, you got a stew going`,
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
  `Perhaps an attic shall I seek`,
  `Don't call my escorts whores`,
  `He's definitely got a type`,
  `That's my son, you pothead`,
  `God knows they're squinters`,
  `Instead of making houses, maybe you should make land on the ocean`,
  `Maybe you're not smart either. I didn't know until they told me`,
  `I've opened a door here that I regret`,
  `What's Spanish for "I know you speak English"?`,
  `You gave us cereal in an ashtray`,
  `My name is Judge`,
  `Why can't I have hair and money and him nothing?`,
  `There's the woman I'm sexually attracted to`,
  `I was trained by Army`,
  `I don't want to blame it all on 9/11, but it certainly didn't help`,
  `Annyong`,
  `Brand new cars don't get waxed`,
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
  `It's tired in here`,
  `Make love in your own hand, mother`,
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
  `Imagine the impact if that had come on right when we turned on the TV`,
  `Cool your Japanese jets`,
  `You forgot to say "away" again`,
  `Look at the beak on that bird`,
  `I think the name Michael is making you look for a man`,
  `You can just say "intercourse"`,
  `We just say "manager"`,
  `Doesn't matter who`,
  `I'd rather be dead in California than alive in Arizona`,
  `I call it hot ham water`,
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
  `I just don't want people's kids getting their sticky little fingers all over these $2,600 pants`,
  `The guy who's dirty dancing with his niece is going to tell the guy in the $3,600 suit how to run the business. Come on`,
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
  `I'm afraid I prematurely shot my wad on what was supposed to be a "dry run", if you will, so now I'm afraid I have something of a mess on my hands`,
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
  `Some call me The Human Metronome`,
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
  `It's as Ann as the nose on Plain's face`,
  `I have Pop-Pop in the attic`,
  `Who wants to go to the hospital?`,
  `That was 100% inappropriate, and I do apologize profusely`,
  `I ought to point to Uncle Oscar's Charlie Browns next time you're on top of him, Mother`,
  `I figured if I blue myself early I'd be nice and relaxed for a 9:00 dinner reservation`,
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
  `You'd think a man locked up in prison would able to abstain`,
  `Your father with his disgusting tweaking`,
  `I couldn't breast feed any of you kids because of that man`,
  `This is the nicest she's been since she found out that Rosa could breast-feed Buster`,
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
  `You're right inside me now`,
  `I can't believe they wouldn't even give me a wheelchair ride`,
  `Doesn't this make you want to have an ice-cream cone?`,
  `I do believe there was some mention of some ice cream`,
  `Does anyone know how to eat one of these?`,
  `There's a new daddy in town. A discipline daddy.`,
  `I tried hitchhiking, but it's hard to do without a thumb`,
  `Now what we do is we paint our lips Joan Crawford red, pop on a little blue eyeliner and then plant a lipstick kiss on every one of them`,
  `Still, where'd the lighter fluid come from?`,
  `Larry, go to a mirror`,
  `Why am I not going under water?`,
  `Why did I lose all the weight if they're going to put me in a pool cover?`,
  `I wish I could draw her nose`,
  `I just found out that my cellular telephone was a lemon`,
  `Are you wearing my dead wife's maternity clothes?`,
  `I can't get this ham open`,
  `If he's got a shot with her, just give me a little tap on the fanny`,
  `Now, when you do this without getting punched in the chest, you'll have more fun`,
  `The Blue Man Group might need me, and I do deserve a fancy phone`,
  `The doctor said I couldn't be a mother now if I tried`,
  `I'm much, much, much older than 15`,
  `And the worst part is he thinks he's passing`,
  `Wow, that does sound like a little girl`,
  `I'm going for a hot Ding Dong`,
  `She said “tingling” like 75 times`,
  `You smell like a pine cone`,
  `I'm on bad mushrooms`,
  `This close, they always look like landscape`,
  `There were cutoffs up here?`,
  `What are you doing with Mother's rape horn?`,
  `Do you want to steer, or are you too old to sit on your pop's lap and drive?`,
  `They impounded my humble trailer`,
  `Does this look contagious to you?`,
  `Nice to be back in a queen`,
  `Let the great experiment begin`,
  `There's got to be a better way to say that`,
  `I am having the time of my life`,
  `I haven't met Ann`,
  `I kind of want to buy her a diamond`,
  `I'm sure that Egg is a very nice person`,
  `I heard zoo noises`,
  `Which pinky do you use less?`,
  `Nothing on the inside`,
  `I'm not proud of the way I was so grossed out when I found out you were gross before`,
  `I'm just hoping to get mildly injured so I can get out of the Army`,
  `I think my nipples are bleeding`,
  `Flashes of Quincy`,
  `I think the plant lady's wearing a thong`,
  `Don't be such an Ann hog`,
  `Go see a Star War`,
  `Why am I not blacking out?`,
  `He swore by that Glisten`,
  `Let's go dig up your uncle`,
  `I will be head to toe in blue makeup until 8:01 in case the Blue Man Group needs their understudy`,
  `Are we having yams?`,
  `First I blow him, then I poke him`,
  `I don't think we need people trying to compete with what I'm wearing`,
  `Don't ask me, I'm just the boy's father`,
  `No one would believe that a woman like me would have a gay son`,
  `I can see marinating a chicken in that`,
  `Your Tweety Bird dance just cost us a run, you moron`,
  `How do we filter out the teases? We don't let them in.`,
  `I am stable as a table`,
  `I would hardly call my mother a girl, but yes, she's still very much a part of my life`,
  `Everybody thinks they're Frank Sinatra`,
  `They make me feel dressier`,
  `A piano could stand on those legs`,
  `Guess she didn't see the drawings`,
  `You have undone all of Dr. Sandor Plumb's work`,
  `I need to prove to her that I'm not just a man, but a man's man`,
  `Shall I put the Posturepedic in the down position?`,
  `Read me the appetizers again`,
  `Did you have too much club sauce on your calamari?`,
  `I tried to drink some of the water, and it was too hot and it tasted like soy sauce`,
  `I think the teriyaki chicken burst`,
  `This isn't turning into the party hangout I hoped`,
  `Stick a wrench in me, I'm done`,
  `Someone order 140 pounds of upper-body strength?`,
  `It's just something the body does when you shake it`,
  `Well, I'm all grown up now`,
  `How'd you like to take a nap, baldy?`,
  `Let's not spin in the comfy chair`,
  `I got Michael out of his marriage, didn't I?`,
  `I need macaroons`,
  `You can win every argument like that, but that does not make you right`,
  `I really hate it when you put on the God costume`,
  `I'm cloaking myself in her scent`,
  `I was made to understand that there would be grilled cheese sandwiches here`,
  `Will someone please have the decency to punch me in the face?`,
  `Mom always taught us to curl up in a ball and remain motionless when confronted`,
  `We have unlimited juice?`,
  `You old horny slut`,
  `We all know you're Annyong`,
  `No, Mother, I can blow myself`,
  `Her?`,
  `She was made in a cup, like soup`,
  `Oh, I'm sorry, I forgot: your wife is dead`,
  `The one thing I will never do is not tell him that I'm taking him to a cabin in the woods and then not take him`,
  `He was our miracle baby`,
  `It's like my heart is getting hard`,
  `I know what an erection feels like, Michael`,
  `Those aren't even birds`,
  `But I'm white`,
  `It ain't easy being white`,
  `I'm Mom and I want to shoot down everything you say so I feel good about myself`,
  `Lets deal some drugs`,
  `Why do you think I wear these?`,
  `A magician never reveals his secrets`,
  `When's that voice gonna drop?`,
  `I'm gonna go get sexy`,
  `They said he was some kind of scientist`,
  `Speaking of settling, How's Ann?`,
  `It's hard to gauge time`,
  `I like the way they think`,
  `I was hoping he would be gifted sexually`,
  `If this were a Lifetime Moment of Truth movie, this would be our act break`,
  `A flower in my garden, a mystery in my panties`,
  `I'm a scholar. I enjoy scholarly pursuits`,
  `The warden could easily be black`,
  `Who is this shiny building of a man?`,
  `Chickens don't clap`,
  `I've got a stair car full of Mexican laborers that would love a day's work`,
  `Are beads cheap?`,
  `We'll see who brings in more honey`,
  `He's thinking about bees again`,
  `We're going to have to figure out something to do so that people can look at you without wanting to kill themselves`,
  `You don’t know a good bird hospital, do you?`
];

export const numberOfLines = adLines.length;

const Generator = class {
  constructor() {
    this.lines = [...adLines];
    this.indexTotal = this.lines.length - 1;
    this.usedQuotes = [];
    this.tempUsedQuotes = [];
  }
};
export const generator = new Generator();

// options: {
//   minChars: num
//   maxChars: num
//   minWords: num
//   maxWords: num
//   noEndPeriod: bool
//   noEndPunctuation: bool
//   capitalize: bool
// }
export const getQuote = (options={minChars: 0}, useOnce) => {
  let excludeArray = [...generator.usedQuotes, ...generator.tempUsedQuotes];
  let quoteArray = generator.lines;
  if (options.minChars || options.maxChars) {
    if (!options.minChars) { options.minChars = 0 }
    if (!options.maxChars) { options.maxChars = 9999}
    quoteArray = generator.lines.filter(line => line[line.length - 1] !== '?'
      && line.length >= options.minChars
      && line.length <= options.maxChars
      && !excludeArray.includes(line)
    );
    if (!quoteArray.length) {
      return 'ERROR. min/max chars'
    }
  }
  if (options.minWords || options.maxWords) {
    if (!options.minWords) { options.minWords = 0 }
    if (!options.maxWords) { options.maxWords = 9999 }
    let filterArray = quoteArray && quoteArray.length ? quoteArray : generator.lines;
    quoteArray = filterArray.filter(quote => {
      let split = quote.split(' ');
      return split.length >= options.minWords && split.length <= options.maxWords && !excludeArray.includes(quote)
    });
    if (!quoteArray.length) {
      return 'ERROR. min/max words'
    }
  }
  if (options.question) {
    quoteArray = quoteArray.filter(quote => quote[quote.length - 1] === '?');
  }

  console.log('options', options, 'choosing from', quoteArray.length);
  let chosenQuote = quoteArray[randomInt(0, quoteArray.length - 1)];
  let usedDestination = useOnce ? generator.usedQuotes : generator.tempUsedQuotes;

  usedDestination.push(chosenQuote)
  let endChar = chosenQuote[chosenQuote.length - 1];
  let addendum = 
    !options.noEndPunctuation 
    && !options.noEndPeriod 
    && !['.','?','!'].includes(endChar)
    ? '.' : '';
  // generator.lines.splice(generator.lines.indexOf(chosenQuote), 1);
  // if (generator.lines.length === 1) {
  //   generator.lines = [...adLines];
  // }
  // console.warn('removed used line', chosenQuote, 'from generator.lines. length is now', generator.lines.length)
  if (options.noEndPunctuation && ['?', '!'].includes(endChar)) {
    chosenQuote = chosenQuote.substr(0, chosenQuote.length - 1)
  }
  if (options.capitalize) {
    let capitalized = '';
    let split = chosenQuote.split(' ');
    split.forEach(word => {
      capitalized += (word[0].toUpperCase() + word.substr(1, word.length - 1)) + ' ';
    });
    chosenQuote = capitalized;
  }
  return chosenQuote + addendum;
};
export const getLine = (maxWords = 5000, minWords = 0, noPunc) => {
  let lineArray = generator.lines.filter(line => {
    let split = line.split(' ');
    let allowed = split.length >= minWords && split.length <= maxWords;
    return allowed;
  });
  let max = lineArray.length - 1;
  let rando = randomInt(0, max);
  let headline = lineArray[rando];
  let endChar = headline[headline.length - 1];
  let addendum = '';
  if (!noPunc && endChar !== '.' && endChar !== '?' && endChar !== '!') {
    addendum = '.';
  }
  // generator.lines.splice(generator.lines.indexOf(headline), 1);
  // if (generator.lines.length === 1) {
  //   generator.lines = [...adLines];
  // }
  return headline + addendum;
};
export const getSelfStatement = (maxChars = 100, noPunc) => {
  let statementArray = generator.lines.filter(line => line[line.length - 1] !== '?'
    && line.length <= maxChars
    && (line.split(' ')[0] === 'I'
    || line.split(' ')[0] === 'I\'m'
    || line.split(' ')[0] === 'My')
  );
  let rando = randomInt(0, statementArray.length - 1);
  let statement = statementArray[rando];
  let endChar = statement[statement.length - 1];
  if (!noPunc && endChar !== '.' && endChar !== '!') {
    statement += '.';
  }  
  return statement;
}
export const getQuestion = () => {
  let questionArray = generator.lines.filter(line => line[line.length - 1] === '?' && line.length < 36);
  let rando = randomInt(0, questionArray.length - 1);
  let question = questionArray[rando];
  return question;
}
export const getAnswer = () => {
  let answerArray = generator.lines.filter(line => line[line.length - 1] !== '?' && line.length < 48);
  let rando = randomInt(0, answerArray.length - 1);
  let answer = answerArray[rando];
  let endChar = answer[answer.length - 1];
  if (endChar !== '.' && endChar !== '!') {
    answer += '.';
  }
  return answer;
}
export const getParagraph = lineArgs => {
  let paragraph = '';
  lineArgs.map(args => {
    paragraph += ' ' + getLine([...args]);
  });
  return paragraph;
};
