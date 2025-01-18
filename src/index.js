const express = require("express");
const path = require("path");
const hbs = require("hbs");
const passport = require("./passport");
const session = require("express-session");
const User = require("./mongodb");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const OpenAI = require("openai");
const dotenv = require("dotenv");
const csv = require("csv-parser");
const fs = require("fs");

dotenv.config();
const app = express();
app.use(session({secret: "cats",
                resave: false,
                saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const templatePath = path.join(__dirname, '../src/hbs');

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath); //automatically goes to folder "views" but we're changing it to go to templates
app.use(express.urlencoded({extended:false})); // parses form data
// app.use("/assets", express.static(path.join(__dirname, "../src/assets")));
app.use(express.static(path.join(__dirname)));

// code to reload automatically:
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname + "/src/hbs"); 

app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});
// 

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect("/login");
    }
}

app.get("/", (req, res) => {
    res.render("main");
});

// test endpoint
app.get("/info", (req, res) => {
    res.render("closet", {aesDes: JSON.stringify({
        0: {
        aesthetic: "Cottagecore", 
        description: "Your style draws from cowboy culture, featuring denim, leather boots, fringe jackets, and wide-brimmed hats. It embraces earthy tones, plaid, and accessories like bandanas or silver buckles, celebrating rugged charm and a connection to the outdoors. ",
        img: "cottage"
        },
        1: {
            aesthetic: "Skater", 
            description: "Your style draws from cowboy culture, featuring denim, leather boots, fringe jackets, and wide-brimmed hats. It embraces earthy tones, plaid, and accessories like bandanas or silver buckles, celebrating rugged charm and a connection to the outdoors. ",
            img: "skater"
            }
    }),
    emoji: "🌤️", city: "Honolulu", name: "Grace", age: 19, temp: "70.0", description: "scattered clouds"
    })
})

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/protected-info", isLoggedIn, async (req, res) => {
    res.render("protected-info", {name: req.user.name});
});

app.post("/protected-info", isLoggedIn, async (req, res) => {
    try {
        const {birthday, city, gender, destination, animal, building, car, food, hobby, palette} = req.body;

        let street = 0;
        let y2k = 0;
        let old_money = 0;
        let norm = 0;
        let cottage = 0;
        let west = 0;
        let artsy = 0;
        let academ = 0;
        let indie = 0;
        let coastal = 0;
        let soft = 0;
        let goth = 0;
        let coquette = 0;
        let athletic = 0;
        let skater = 0;
        let vintage = 0;

        if (destination == "city-street") {
            street += 3;
            y2k += 4;
            old_money += 3;
            norm += 2;
        } 
        else if (destination == "countryside") {
            cottage += 5;
            west += 4;
            artsy += 3;
            academ += 2;
        }
        else if (destination == "mountain") {
            west += 5;
            cottage += 4;
            indie += 3;
            artsy += 2;
        }
        else if (destination == "villa") {
            coastal += 5;
            old_money += 4;
            soft += 3;
            norm += 2;
        }

        if (animal == "bird") {
            artsy += 5;
            indie += 4;
            cottage += 3;
        }
        else if (animal == "black-cat") {
            goth += 5;
            coquette += 4;
            artsy += 3;
        }
        else if (animal == "cat") {
            cottage += 5;
            academ += 4;
            soft += 3;
        }
        else if (animal == "dog") {
            athletic += 5;
            norm += 4;
            west += 3;
        }
        else if (animal == "horse") {
            west += 5;
            old_money += 4;
            cottage += 3;
        }

        if (building == "cottage") {
            cottage += 5;
            coastal += 4;
            indie += 3;
        }
        else if (building == "goth-mansion") {
            goth += 5;
            academ += 4;
            old_money += 3;
        }
        else if (building == "library") {
            academ += 5;
            artsy += 4;
            cottage += 3;
        }
        else if (building == "vinyl-shop") {
            indie += 5;
            skater += 4;
            y2k += 3;
        }

        if (car == "beach-van") {
            coastal += 5;
            soft += 4;
            indie += 3;
        }
        else if (car == "jeep") {
            west += 5;
            athletic += 4;
            norm += 3;
        }
        else if (car == "corvette") {
            vintage += 5;
            street += 4;
            y2k += 3;
        }
        else if (car == "sports-car") {
            old_money += 5;
            y2k += 4;
            street += 3;
        }
        else if (car == "tesla") {
            norm += 5;
            old_money += 4;
            coastal += 3;
        }

        if (food == "acai") {
            coastal += 5;
            soft += 4;
            athletic += 3;
        }
        else if (food == "bakery") {
            cottage += 5;
            academ += 4;
            coastal += 3;
        }
        else if (food == "farmers-market") {
            cottage += 5;
            coastal += 4;
            indie += 3;
        }
        else if (food == "fine-dining") {
            old_money += 5;
            coquette += 4;
            norm += 3;
        }
        else if (food == "ramen") {
            y2k += 5;
            indie += 4;
            skater += 3;
        }
        else if (food == "pancakes") {
            vintage += 5;
            indie += 4;
            soft += 3;
        }
        else if (food == "sweets") {
            coquette += 5;
            soft += 4;
            y2k += 3;
        }

        if (hobby == "guitar") {
            indie += 5;
            artsy += 4;
            skater += 3;
        }
        else if (hobby == "hiking") {
            athletic += 5;
            west += 4;
            cottage += 3;
        }
        else if (hobby == "knitting") {
            cottage += 5;
            coastal += 4;
            artsy += 3;
        }
        else if (hobby == "music") {
            y2k += 5;
            indie += 4;
            skater += 3;
        }
        else if (hobby == "painting") {
            artsy += 5;
            cottage += 4;
            academ += 3;
        }
        else if (hobby == "reading") {
            academ += 5;
            artsy += 4;
            cottage += 3;
        }

        if (palette == "basic") {
            soft += 5;
            y2k += 4;
            indie += 3;
        }
        else if (palette == "beach") {
            coastal += 5;
            cottage += 4;
            norm += 3;
        }
        else if (palette == "coquette") {
            coquette += 5;
            soft += 4;
            y2k += 3;
        }
        else if (palette == "dark") {
            goth += 5;
            academ += 4;
            norm += 3;
        }
        else if (palette == "indie") {
            cottage += 5;
            artsy += 4;
            indie += 3;
        }
        else if (palette == "old-money") {
            old_money += 5;
            academ += 4;
            coastal += 3;
        }
        else if (palette == "vintage") {
            vintage += 5;
            academ += 4;
            indie += 3;
        }

        let nums = [street, y2k, old_money, norm, coastal, cottage, west, artsy, academ, indie, soft, goth, coquette, athletic, skater, vintage];
        let maxNum = Math.max(...nums);
        var aesthetic = []
        let description = []
        let img = []

        if (street == maxNum) {
            img.push("street")
            aesthetic.push("Street Style")
            description.push("Your style reflects urban culture and individuality, blending comfort and edgy trends. Rooted in skateboarding and hip-hop culture, it features oversized hoodies, graphic tees, sneakers, and accessories like bucket hats or chains. It's fluid, bold, and experimental, often mixing high fashion with casual streetwear.")
        }
        if (vintage == maxNum) {
            img.push("vintage")
            aesthetic.push("Vintage")
            description.push("You embrace styles and items from past decades, exuding nostalgia and timeless charm. Think retro silhouettes, muted tones, lace details, and classic patterns like polka dots or houndstooth. It often incorporates thrifted or antique finds, emphasizing sustainability and uniqueness. Vintage aesthetics celebrate a romanticized vision of the past with elements like rotary phones, old cameras, and vinyl records.")
        }
        if (old_money == maxNum) {
            aesthetic.push("Old Money")
            description.push("Your style is sophisticated and preppy, reflecting wealth and elegance without ostentation. Hallmarks include tailored blazers, polos, loafers, and muted palettes like navy, cream, and hunter green. Inspired by Ivy League fashion and country clubs, it channels understated luxury and refinement.")
        }
        if (cottage == maxNum) {
            img.push("cottage")
            aesthetic.push("Cottagecore")
            description.push("You romanticize rural life, focusing on simplicity and a connection to nature. Flowing dresses, cozy knits, floral prints, and earth tones define the look. It celebrates gardening, baking, and crafts, creating a whimsical and serene aesthetic rooted in pastoral ideals.")
        }
        if (goth == maxNum) {
            img.push("goth")
            aesthetic.push("Goth")
            description.push("Your style is dark, mysterious, and dramatic, inspired by gothic literature, architecture, and music. It features black clothing, lace, leather, corsets, and heavy boots. Accessories include chokers, silver jewelry, and dark makeup, creating a striking and alternative aesthetic.")
        }
        if (coquette == maxNum) {
            img.push("coquette")
            aesthetic.push("Coquette")
            description.push("Your style is feminine and flirtatious, embracing soft colors, lace, bows, and delicate accessories. Inspired by vintage romance, it often features pastel tones, floral patterns, and beauty touches like winged eyeliner or rosy blush. It’s dreamy and elegant, with a hint of playful charm.")
        }
        if (skater == maxNum) {
            img.push("skater")
            aesthetic.push("Skater")
            description.push("Your style is laid-back and rooted in skateboarding culture. It includes graphic tees, loose jeans, hoodies, Vans, and snapback hats. The aesthetic emphasizes comfort, movement, and a rebellious edge, often blending streetwear influences.")
        }
        if (academ == maxNum) {
            img.push("academ")
            aesthetic.push("Academia")
            description.push("You embrace intellectual pursuits and a scholarly style, often in dark or muted tones. Think blazers, sweaters, pleated skirts, and oxfords. Subgenres like dark academia focus on gothic elements, while light academia embraces softer tones and a romanticized academic life.")
        }
        if (artsy == maxNum) {
            img.push("artsy")
            aesthetic.push("Artsy")
            description.push("You embrace creativity and individuality, often featuring bold patterns, unique accessories, and vibrant colors. It includes handmade or thrifted pieces, reflecting a love for art and self-expression. Accessories like berets, statement earrings, and paint-stained overalls are common.")
        }
        if (indie == maxNum) {
            img.push("indie")
            aesthetic.push("Indie")
            description.push("Your style is quirky and alternative, inspired by independent music and counter-culture. It features vintage clothing, DIY accessories, and unconventional patterns. Indie embraces individuality and often overlaps with thrifting culture, celebrating non-mainstream aesthetics.")
        }
        if (coastal == maxNum) {
            img.push("coastal")
            aesthetic.push("Coastal Grandmother")
            description.push("Your style is breezy and elegant, inspired by life by the sea. Think linen shirts, oversized sweaters, straw hats, and neutral tones like white, beige, and navy. It’s cozy, timeless, and relaxed, channeling seaside sophistication and comfort.")
        }
        if (west == maxNum) {
            img.push("west")
            aesthetic.push("Western")
            description.push("Your style draws from cowboy culture, featuring denim, leather boots, fringe jackets, and wide-brimmed hats. It embraces earthy tones, plaid, and accessories like bandanas or silver buckles, celebrating rugged charm and a connection to the outdoors.")
        }
        if (soft == maxNum) {
            img.push("soft")
            aesthetic.push("Soft Girl")
            description.push("Your style is sweet and youthful, with pastel colors, plaid skirts, oversized cardigans, and sneakers. It includes accessories like hair clips, pearl jewelry, and light makeup with blushy tones. This aesthetic is playful, innocent, and cheerful.")
        }
        if (y2k == maxNum) {
            img.push("y2k")
            aesthetic.push("Y2K")
            description.push("Your style is a bold, futuristic aesthetic inspired by the early 2000s. It includes metallics, crop tops, low-rise jeans, tiny sunglasses, and chunky platforms. Neon colors and tech-inspired patterns evoke nostalgia for the millennial era.")
        }
        if (norm == maxNum) {
            img.push("norm")
            aesthetic.push("Normcore/Neutral")
            description.push("Your style is minimalistic and functional, prioritizing comfort and simplicity. It includes basic tees, jeans, sneakers, and neutral tones like black, white, and grey. This aesthetic blends seamlessly into everyday life, focusing on understated style.")
        }
        if (athletic == maxNum) {
            img.push("athletic")
            aesthetic.push("Athletic")
            description.push("Your style combines functionality and sporty flair. It features leggings, sneakers, windbreakers, and sportswear brands like Nike or Adidas. Accessories include caps and gym bags, reflecting an active, health-conscious lifestyle.")
        }

        if (aesthetic.length > 1) {
            multiple = true;
        }
        else {
            multiple = false;
        }

        let aesDes = [];
        for (let i = 0; i < aesthetic.length; i++) {
            mini = {};
            mini["aesthetic"] = aesthetic[i];
            mini["description"] = description[i];
            mini["img"] = img[i];
            aesDes.push(mini);
        }

        const user = await User.findById(req.user._id);

        user.aesthetic = aesDes;
        user.birthday = birthday;
        user.gender = gender;
        user.location = city;
        await user.save();

        res.json({success: true, aesDes, multiple})
    }
    catch (err) {
        res.status(400).json({success: false, message: "Error submitting survey: " + err.message});
    }
});

function getAge(birthday) {
    let today = new Date();
    let birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    if (birthDate.getMonth() > today.getMonth() || (birthDate.getMonth() == today.getMonth() && today.getDate() < birthDate.getDate())) {
        age -= 1;
    }
    return age
}

app.get("/closet", isLoggedIn, async (req, res) => {
    try {
        const apiKey = process.env.WEATHER_API_KEY;
        const city = req.user.location
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        const response = await fetch(weatherApiUrl);

        if(!response.ok) {
            throw new Error("Could not fetch weather data");
        }

        weatherData = await response.json();

        let {
            main: {temp},
            weather: [{description, id}]
        } = weatherData;
        const emoji = getWeatherEmoji(id);
        temp = ((temp - 273.15) * (9/5) + 32).toFixed(1)
        let age = getAge(req.user.birthday)

        res.render("closet", {aesDes: JSON.stringify(req.user.aesthetic), age, name: req.user.name, city, temp, description, emoji});
    }
    catch (error) {
        res.status(500).json({success: false, message: "Error loading closet: " + error.message})
    }
})

const uri = "mongodb://localhost:27017/outfit_finder";
const client = new MongoClient(uri)

async function filterClothes(genderFilt) {
    try {
        await client.connect();
        const db = client.db("outfit_finder");
        const Clothes = db.collection("clothes");

        return await Clothes.find({
            index_name: {$in: genderFilt}
        }).toArray();
    }
    finally {
        await client.close()
    }
}

app.post("/closet", isLoggedIn, async (req, res) => {
    try {
        const {weather, age, occasion, formality} = req.body;
        const genderFilt = req.user.gender === "female" // syntax: condition ? valueIfTrue : valueIfFalse;
            ? ["Ladieswear", "Divided", "Ladies Accessories"]
            : req.user.gender === "male"
            ? ["Menswear"]
            : ["Ladieswear", "Menswear", "Divided"];

        const clothesFilter = await filterClothes(genderFilt);
        const lessClothes = clothesFilter.map(item => ({
            pattern: item.graphical_appearance_name,
            productType: item.product_type_name,
            color: item.colour_group_name,
            id: item.article_id,
            gender: item.index_name
        }))
        const clothesJson = JSON.stringify(lessClothes, null, 2);
        console.log(lessClothes)

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [{
                    role: "user",
                    content: `
                        Generate 3 different outfit ideas (items: top, bottom, shoes, and optional accessories) with these details: 
                        - Age: ${age}
                        - Weather today: ${weather}
                        - Style: ${req.user.aesthetic}
                        - Occasion: ${occasion}
                        - Formality level: ${formality}
                        IMPORTANT: Use only these items: ${clothesJson}
                        Return only valid JSON: 
                        {
                        "1": {
                            outfitName: "<outfit name>",
                            itemName: [<color item>, <color item>, etc],
                            "id": [<id>, <id>, etc.]
                            },
                        "2": { etc..
                            }
                        }
                        `
                }]
            });
            console.log(response)

            let chat = response.choices[0].message.content;
            console.log(chat)
            first = chat.indexOf("{");
            last = chat.lastIndexOf("}") + 1;
            newChat = chat.slice(first, last);

            const chatResponse = JSON.parse(newChat);
            console.log(chatResponse);
            res.json({success: true, chatResponse})
        }
        catch (err) {
            console.error("error during ai call")
        }
    }
    catch (err) {
        res.status(500).json({success: false, error: "Error submitting form: " + err.message})
    }
})

function getWeatherEmoji(weatherId){
    switch(true){ //if any of the below are true
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId == 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default: 
        return "🌚";
    }
}

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/signup", async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const check = await User.findOne({email: email});
        if (check) {
            return res.json({success: false, message: "User already exists"});
        }

        const user = await User.create({
            name,
            email,
            password,
            authType: "email"
        });
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            res.json({success: true, redirect: "/protected-info"});
        })
    }
    catch (err) {
        res.status(500).send("Error creating user: " + err.message);
    }
});

app.get("/auth/google",
    passport.authenticate("google", {scope: ['email', 'profile']})
);

app.get("/auth/google/callback",
    passport.authenticate("google", {failureRedirect: "/auth/failure"}),
    async (req, res) => {
        if (!req.user.birthday) {
            res.redirect("/protected-info");
        }
        else {
            res.redirect("/closet");
        }
    }
);

app.get("/auth/failure", (req, res) => {
    res.send("Something went wrong..");
});

app.post("/login", async (req, res, next) => {
    try {
        const check = await User.findOne({email: req.body.email});

        if (!check) {
            return res.json({success: false, message: "User not found"});
        }

        if(check.password === req.body.password) {
            req.login(check, (err) => {
                if (err) {
                    return next(err);
                }
                if (check.aesthetic) {
                    res.json({success: true, redirect: "/closet"});
                }
                else {
                    res.json({success: true, redirect: "/protected-info"});
                }
            })
        }
        else {
            res.json({success: false, message: "Wrong Password"});
        }
    }
    catch {
        res.send("Wrong Details");
    }
});

cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7
}

app.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
    req.session.destroy();
    res.redirect("/")
    })
});


module.exports = app;

app.listen(3000, () => {
    console.log("port connected");
});
