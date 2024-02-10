const app = require('express')()
const {gql} = require('apollo-server-express')

const PORT = process.env.PORT || 4000

// API

const towns = require('./api/towns.json')

// schemas

const Profiles = require('./schemas/Profiles')  
const Tours = require('./schemas/Tours')       
const Recipes = require('./schemas/Recipes')     
const Jobs = require('./schemas/Jobs')

// microservices

const {middleware, mongo_connect, apollo_start, slicer, get_id} = require('./microservices/microservices')

// database url

const url = 'mongodb+srv://Slavus54:ieOUiW5CNwW5gQ5D@web-2024.v43n3ay.mongodb.net/Nurtour-IO'

// middlewares

middleware(app)

// connect to MongoDB

mongo_connect(url, 'MongoDB is connected...')

// responses

const {  
    PERSONAL_INFO_SUCCESS, PERSONAL_INFO_FALL,
    GEO_INFO_SUCCESS, GEO_INFO_FALL, 
    COMMON_INFO_SUCCESS, COMMON_INFO_FALL, 
    SECURITY_SUCCESS, SECURITY_FALL,
    CHILD_CREATED, CHILD_UPDATED, CHILD_DELETED, CHILD_FALL,
    MANUSCRIPT_CREATED, MANUSCRIPT_LIKED, MANUSCRIPT_DELETED, MANUSCRIPT_FALL
} = require('./responses/profile-responses')

const {
    TOUR_CREATED_SUCCESS, TOUR_CREATED_FALL,
    LOCATION_CREATED, LOCATION_LIKED, LOCATION_DELETED, LOCATION_FALL,
    TOUR_RATE_SUCCESS, TOUR_RATE_FALL, 
    FACT_SUCCESS, FACT_FALL
} = require('./responses/tour-responses')

const {
    RECIPE_CREATED_SUCCESS, RECIPE_CREATED_FALL,
    COOKING_CREATED, COOKING_LIKED, COOKING_DELETED, COOKING_FALL,
    RECIPE_INFO_SUCCESS, RECIPE_INFO_FALL,
    RECIPE_HEALTH_SUCCESS, RECIPE_HEALTH_FALL,
    RECIPE_STEP_SUCCESS, RECIPE_STEP_FALL
} = require('./responses/recipe-responses')

const {
    JOB_CREATED_SUCCESS, JOB_CREATED_FALL,
    JOB_STATUS_JOINED, JOB_STATUS_UPDATED, JOB_STATUS_EXIT, JOB_STATUS_FALL,
    JOB_TASK_SUCCESS, JOB_TASK_FALL,
    JOB_PHOTO_CREATED, JOB_PHOTO_LIKED, JOB_PHOTO_DELETED, JOB_PHOTO_FALL
} = require('./responses/job-responses')

const typeDefs = gql`
    type Cord {
        lat: Float!,
        long: Float!
    }
    input ICord {
        lat: Float!,
        long: Float!
    }
    type UserCookie {
        account_id: String!,
        username: String!,
        role: String!
    }
    type AccountComponent {
        shortid: String!,
        title: String!,
        path: String!
    }
    type Child {
        shortid: String!,
        fullname: String!,
        sex: String!,
        status: String!,
        image: String!
    }
    type Manuscript {
        shortid: String!,
        title: String!,
        category: String!,
        words: Float!,
        image: String!,
        likes: Float!,
        dateUp: String!
    }
    type Location {
        shortid: String!,
        name: String!,
        title: String!,
        category: String!,
        image: String!,  
        cords: Cord!,
        likes: Float!
    }
    type Fact {
        shortid: String!,
        name: String!,
        text: String!,
        level: String!,
        isTrue: Boolean!
    }
    type Step {
        id: String!,
        content: String!,
        duration: Float!
    }
    input IStep {
        id: String!,
        content: String!,
        duration: Float!
    }
    type Cooking {
        shortid: String!,
        name: String!,
        text: String!,
        image: String!,
        likes: Float!,
        dateUp: String!
    }
    type Health {
        shortid: String!,
        name: String!,
        ingredient: String!,
        category: String!,
        percent: Float!
    }
    type Task {
        id: String!,
        content: String!,
        level: String!,
        cost: Float!
    }
    input ITask {
        id: String!,
        content: String!,
        level: String!,
        cost: Float!
    }
    type Member {
        account_id: String!,
        username: String!,
        role: String!
    }
    type Photo {
        shortid: String!,
        name: String!,
        text: String!,
        image: String!,
        likes: Float!
    }
    type Job {
        id: ID!,
        shortid: String!,
        account_id: String!,
        username: String!,
        title: String!,
        category: String!,
        tasks: [Task]!,
        ageBorder: Float!,
        compensation: Float!,
        dateUp: String!,
        time: String!,
        region: String!,
        cords: Cord!,
        members: [Member]!,
        photos: [Photo]!
    }
    type Recipe {
        id: ID!,
        shortid: String!,
        account_id: String!,
        username: String!,
        title: String!,
        category: String!,
        cuisine: String!,
        level: String!,
        ingredients: [String]!,
        steps: [Step]!,
        time: Float!,
        calories: Float!,
        link: String!,
        rating: Float!,
        cookings: [Cooking]!,
        healthes: [Health]!
    }
    type Tour {
        id: ID!,
        shortid: String!,
        account_id: String!,
        username: String!,
        title: String!,
        category: String!,
        region: String!,
        cords: Cord!,
        rating: Float!,
        locations: [Location]!,
        facts: [Fact]!
    }
    type Profile {
        account_id: String!,
        username: String!,
        security_code: String!,
        telegram: String!,
        role: String!,
        weekday: String!,
        region: String!,
        cords: Cord!,
        main_photo: String!,
        childs: [Child]!,
        manuscripts: [Manuscript]!,
        account_components: [AccountComponent]!
    }
    type Query {
        getProfiles: [Profile]!
        getTours: [Tour]!
        getRecipes: [Recipe]!
        getJobs: [Job]!
    }
    type Mutation {
        register(username: String!, security_code: String!, telegram: String!, role: String!, weekday: String!, region: String!, cords: ICord!, main_photo: String!) : UserCookie!
        login(security_code: String!) : UserCookie!
        getProfile(account_id: String!) : Profile
        updateProfilePersonalInfo(account_id: String!, main_photo: String!) : String!
        updateProfileGeoInfo(account_id: String!, region: String!, cords: ICord!) : String!
        updateProfileCommonInfo(account_id: String!, role: String!, weekday: String!) : String!
        updateProfileSecurityCode(account_id: String!, security_code: String!) : String!
        manageProfileChild(account_id: String!, option: String!, fullname: String!, sex: String!, status: String!, image: String!, coll_id: String!) : String!
        manageProfileManuscript(account_id: String!, option: String!, title: String!, category: String!, words: Float!, image: String!, dateUp: String!, coll_id: String!) : String!
        createTour(username: String!, id: String!, title: String!, category: String!, region: String!, cords: ICord!, rating: Float!) : String!
        getTour(shortid: String!) : Tour!
        manageTourLocation(username: String!, id: String!, option: String!, title: String!, category: String!, image: String!, cords: ICord!, coll_id: String!) : String! 
        updateTourRating(username: String!, id: String!, rating: Float!) : String!
        makeTourFact(username: String!, id: String!, text: String!, level: String!, isTrue: Boolean!) : String!
        createRecipe(username: String!, id: String!, title: String!, category: String!, cuisine: String!, level: String!, ingredients: [String]!, steps: [IStep]!, time: Float!, calories: Float!, link: String!, rating: Float!) : String!
        getRecipe(shortid: String!) : Recipe!
        manageRecipeCooking(username: String!, id: String!, option: String!, text: String!, image: String!, dateUp: String!, coll_id: String!) : String!
        updateRecipeInfo(username: String!, id: String!, link: String!, rating: Float!) : String!
        makeRecipeHealth(username: String!, id: String!, ingredient: String!, category: String!, percent: Float!) : String!
        updateRecipeStep(username: String!, id: String!, coll_id: String!, content: String!) : String!
        createJob(username: String!, id: String!, title: String!, category: String!, tasks: [ITask]!, ageBorder: Float!, compensation: Float!, dateUp: String!, time: String!, region: String!, cords: ICord!, role: String!) : String!
        getJob(shortid: String!) : Job!
        manageJobStatus(username: String!, id: String!, option: String!, role: String!) : String!
        updateJobTask(username: String!, id: String!, coll_id: String!, content: String!, level: String!) : String!
        manageJobPhoto(username: String!, id: String!, option: String!, text: String!, image: String!, coll_id: String!) : String!
    }
`

const resolvers = {
    Query: {
        getProfiles: async () => {
            const profiles = await Profiles.find() 

            return profiles
        },
        getTours: async () => {
            const tours = await Tours.find()

            return tours
        },
        getRecipes: async () => {
            const recipes = await Recipes.find()

            return recipes
        },
        getJobs: async () => {
            const jobs = await Jobs.find()

            return jobs
        }
    },
    Mutation: {
        register: async (_, {username, security_code, telegram, role, weekday, region, cords, main_photo}) => {
            const profile = await Profiles.findOne({username}) 
            let drop_object = {account_id: '', username, role: ''}

            if (profile === null) {

                let account_id = get_id()

                const newProfile = new Profiles({
                    account_id,
                    username,
                    security_code,
                    telegram,
                    role,
                    weekday,
                    region,
                    cords,
                    main_photo,
                    childs: [],
                    manuscripts: [],
                    account_components: []
                })

                drop_object = {account_id, username, role}
                
                await newProfile.save()
            } 
        
            return drop_object
        },
        login: async (_, {security_code}) => {
            const profile = await Profiles.findOne({security_code}) 
            let drop_object = {account_id: '', username: '', role: ''}
           
            if (profile) {  
                drop_object = {account_id: profile.account_id, username: profile.username, role: profile.role}                       
            }

            return drop_object
        },
        getProfile: async (_, {account_id}) => {
            const profile = await Profiles.findOne({account_id}) 
            
            return profile
        },
        updateProfilePersonalInfo: async (_, {account_id, main_photo}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {
        
                profile.main_photo = main_photo

                await Profiles.updateOne({account_id}, {$set: profile})

                return PERSONAL_INFO_SUCCESS
            }

            return PERSONAL_INFO_FALL
        },
        updateProfileGeoInfo: async (_, {account_id, region, cords}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {

                profile.region = region
                profile.cords = cords
             
                await Profiles.updateOne({account_id}, {$set: profile})

                return GEO_INFO_SUCCESS
            }

            return GEO_INFO_FALL
        },
        updateProfileCommonInfo: async (_, {account_id, role, weekday}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {

                profile.role = role
                profile.weekday = weekday
              
                await Profiles.updateOne({account_id}, {$set: profile})

                return COMMON_INFO_SUCCESS
            }

            return COMMON_INFO_FALL
        },
        updateProfileSecurityCode: async (_, {account_id, security_code}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {

                profile.security_code = security_code

                await Profiles.updateOne({account_id}, {$set: profile})

                return SECURITY_SUCCESS
            }

            return SECURITY_FALL
        },
        manageProfileChild: async (_, {account_id, option, fullname, sex, status, image, coll_id}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {
            
                let feedback = ''

                if (option === 'create') {

                    let shortid = get_id()

                    profile.childs = [...profile.childs, {
                        shortid,
                        fullname,
                        sex,
                        status,
                        image
                    }]

                    profile.childs = slicer(profile.childs, 40)

                    feedback = CHILD_CREATED

                } else if (option === 'update') {

                    profile.childs.map(el => {
                        if (el.shortid === coll_id) {
                            el.status = status
                            el.image = image
                        }
                    })

                    feedback = CHILD_UPDATED

                } else {

                    profile.childs = profile.childs.filter(el => el.shortid !== coll_id)

                    feedback = CHILD_DELETED
                }


                await Profiles.updateOne({account_id}, {$set: profile})

                return feedback
            }

            return CHILD_FALL
        },
        manageProfileManuscript: async (_, {account_id, option, title, category, words, image, dateUp, coll_id}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {
            
                let feedback = ''
                
                if (option === 'create') {

                    let shortid = get_id()

                    profile.manuscripts = [...profile.manuscripts, {
                        shortid,
                        title,
                        category,
                        words,
                        image,
                        likes: 0,
                        dateUp
                    }]

                    profile.manuscripts = slicer(profile.manuscripts, 40)

                    feedback = MANUSCRIPT_CREATED

                } else if (option === 'like') {

                    profile.manuscripts.map(el => {
                        if (el.shortid !== coll_id) {
                            el.likes += 1
                        }
                    })

                    feedback = MANUSCRIPT_LIKED

                } else {

                    profile.manuscripts = profile.manuscripts.filter(el => el.shortid !== coll_id)

                    feedback = MANUSCRIPT_DELETED
                }

                await Profiles.updateOne({account_id}, {$set: profile})

                return feedback
            }

            return MANUSCRIPT_FALL
        },
        createTour: async (_, {username, id, title, category, region, cords, rating}) => {
            const profile = await Profiles.findOne({username, account_id: id}) 
            const tour = await Tours.findOne({username, title, category, region, cords, rating})

            if (profile && !tour) {
                if (profile.account_components.filter(el => el.path === 'tour').find(el => el.title === title) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'tour'
                    }]

                    const newTour = new Tours({
                        shortid,
                        account_id: profile.account_id,
                        username: profile.username,
                        title,
                        category,
                        region,
                        cords,
                        rating,
                        locations: [],
                        facts: []
                    })

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newTour.save()

                    return TOUR_CREATED_SUCCESS
                }
            }

            return TOUR_CREATED_FALL
        },
        getTour: async (_, {shortid}) => {
            const tour = await Tours.findOne({shortid})

            return tour
        },
        manageTourLocation: async (_, {username, id, option, title, category, image, cords, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const tour = await Tours.findOne({shortid: id})

            if (profile && tour) {

                let feedback = ''

                if (option === 'create') {

                    let shortid = get_id()

                    tour.locations = [...tour.locations, {
                        shortid,
                        name: profile.username,
                        title,
                        category,
                        image,  
                        cords,
                        likes: 0
                    }]

                    tour.locations = slicer(tour.locations, 40)

                    feedback = LOCATION_CREATED

                } else if (option === 'like') {

                    tour.locations.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                    feedback = LOCATION_LIKED

                } else {

                    tour.locations = tour.locations.filter(el => el.shortid !== coll_id)

                    feedback = LOCATION_DELETED
                }

                await Tours.updateOne({shortid: id}, {$set: tour})

                return feedback
            }

            return LOCATION_FALL
        },
        updateTourRating: async (_, {username, id, rating}) => {
            const profile = await Profiles.findOne({username})
            const tour = await Tours.findOne({shortid: id})

            if (profile && tour) {

                tour.rating = rating
                
                await Tours.updateOne({shortid: id}, {$set: tour})

                return TOUR_RATE_SUCCESS
            }

            return TOUR_RATE_FALL
        },
        makeTourFact: async (_, {username, id, text, level, isTrue}) => {
            const profile = await Profiles.findOne({username})
            const tour = await Tours.findOne({shortid: id})

            if (profile && tour) {

                let shortid = get_id()

                tour.facts = [...tour.facts, {
                    shortid,
                    name: profile.username,
                    text,
                    level,
                    isTrue
                }]

                tour.facts = slicer(tour.facts, 40)

                await Tours.updateOne({shortid: id}, {$set: tour})

                return FACT_SUCCESS
            }

            return FACT_FALL
        },
        createRecipe: async (_, {username, id, title, category, cuisine, level, ingredients, steps, time, calories, link, rating}) => {
            const profile = await Profiles.findOne({username, account_id: id})
            const recipe = await Recipes.findOne({username, title, category, cuisine, level, ingredients, steps, time, calories, link, rating})
        
            if (profile && !recipe) {
                if (profile.account_components.filter(el => el.path === 'recipe').find(el => el.title === title) === undefined) {
                 
                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'recipe'
                    }]

                    const newRecipe = new Recipes({
                        shortid,
                        account_id: profile.account_id,
                        username: profile.username,
                        title,
                        category,
                        cuisine,
                        level,
                        ingredients,
                        steps,
                        time,
                        calories,
                        link,
                        rating,
                        cookings: [],
                        healthes: []
                    })

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newRecipe.save()

                    return RECIPE_CREATED_SUCCESS
                }
            }

            return RECIPE_CREATED_FALL
        },
        getRecipe: async (_, {shortid}) => {
            const recipe = await Recipes.findOne({shortid})

            return recipe
        },
        manageRecipeCooking: async (_, {username, id, option, text, image, dateUp, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const recipe = await Recipes.findOne({shortid: id})

            if (profile && recipe) {
                
                let feedback = ''

                if (option === 'create') {

                    let shortid = get_id()
                    
                    recipe.cookings = [...recipe.cookings, {
                        shortid,
                        name: profile.username,
                        text,
                        image,
                        likes: 0,
                        dateUp
                    }]

                    recipe.cookings = slicer(recipe.cookings, 40)

                    feedback = COOKING_CREATED

                } else if (option === 'like') {

                    recipe.cookings.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                    feedback = COOKING_LIKED

                } else {

                    recipe.cookings = recipe.cookings.filter(el => el.shortid !== coll_id)

                    feedback = COOKING_DELETED
                }

                await Recipes.updateOne({shortid: id}, {$set: recipe})

                return feedback
            }

            return COOKING_FALL
        },
        updateRecipeInfo: async (_, {username, id, link, rating}) => {
            const profile = await Profiles.findOne({username})
            const recipe = await Recipes.findOne({shortid: id})

            if (profile && recipe) {

                recipe.link = link
                recipe.rating = rating

                await Recipes.updateOne({shortid: id}, {$set: recipe})

                return RECIPE_INFO_SUCCESS
            }

            return RECIPE_INFO_FALL
        },
        makeRecipeHealth: async (_, {username, id, ingredient, category, percent}) => {
            const profile = await Profiles.findOne({username})
            const recipe = await Recipes.findOne({shortid: id})

            if (profile && recipe) {

                let shortid = get_id()

                recipe.healthes = [...recipe.healthes, {
                    shortid,
                    name: profile.username,
                    ingredient,
                    category,
                    percent
                }]

                recipe.healthes = slicer(recipe.healthes, 40)

                await Recipes.updateOne({shortid: id}, {$set: recipe})

                return RECIPE_HEALTH_SUCCESS
            }

            return RECIPE_HEALTH_FALL
        },
        updateRecipeStep: async (_, {username, id, coll_id, content}) => {
            const profile = await Profiles.findOne({username})
            const recipe = await Recipes.findOne({shortid: id})

            if (profile && recipe) {

                recipe.steps.map(el => {
                    if (el.id === coll_id) {
                        el.content = content
                    }
                })

                await Recipes.updateOne({shortid: id}, {$set: recipe})

                return RECIPE_STEP_SUCCESS
            }

            return RECIPE_STEP_FALL
        },
        createJob: async (_, {username, id, title, category, tasks, ageBorder, compensation, dateUp, time, region, cords, role}) => {
            const profile = await Profiles.findOne({username, account_id: id})
            const job = await Jobs.findOne({username, title, category, tasks, ageBorder, compensation, dateUp, time, region, cords})
        
            if (profile && !job) {
                if (profile.account_components.filter(el => el.path === 'job').find(el => el.title === title) === undefined) {
                    
                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'job'
                    }]

                    const newJob = new Jobs({
                        shortid,
                        account_id: profile.account_id,
                        username: profile.username,
                        title,
                        category,
                        tasks,
                        ageBorder,
                        compensation,
                        dateUp,
                        time,
                        region,
                        cords,
                        members: [{
                            account_id: profile.account_id,
                            username: profile.username,
                            role
                        }],
                        photos: []
                    })

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newJob.save()

                    return JOB_CREATED_SUCCESS
                }
            }

            return JOB_CREATED_FALL
        },
        getJob: async (_, {shortid}) => {
            const job = await Jobs.findOne({shortid})

            return job
        },
        manageJobStatus: async (_, {username, id, option, role}) => {
            const profile = await Profiles.findOne({username})
            const job = await Jobs.findOne({shortid: id})

            if (profile && job) {

                let feedback = ''

                if (option === 'join') {

                    profile.account_components = [...profile.account_components, {
                        shortid: job.shortid,
                        title: job.title,
                        path: 'job'
                    }]

                    job.members = [...job.members, {
                        account_id: profile.account_id,
                        username: profile.username,
                        role
                    }]

                    feedback = JOB_STATUS_JOINED

                } else if (option === 'update') {

                    job.members.map(el => {
                        if (el.account_id === profile.account_id) {
                            el.role = role
                        }
                    })

                    feedback = JOB_STATUS_UPDATED

                } else {

                    profile.account_components = profile.account_components.filter(el => el.shortid !== job.shortid)

                    job.members = job.members.filter(el => el.account_id !== profile.account_id)

                    feedback = JOB_STATUS_EXIT
                }

                await Profiles.updateOne({username}, {$set: profile})
                await Jobs.updateOne({shortid: id}, {$set: job})

                return feedback
            }

            return JOB_STATUS_FALL
        },
        updateJobTask: async (_, {username, id, coll_id, content, level}) => {
            const profile = await Profiles.findOne({username})
            const job = await Jobs.findOne({shortid: id})

            if (profile && job) {

                job.tasks.map(el => {
                    if (el.id === coll_id) {
                        el.content = content
                        el.level = level
                    }
                })

                await Jobs.updateOne({shortid: id}, {$set: job})

                return JOB_TASK_SUCCESS
            }
            return JOB_TASK_FALL
        },
        manageJobPhoto: async (_, {username, id, option, text, image, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const job = await Jobs.findOne({shortid: id})

            if (profile && job) {

                let feedback = ''

                if (option === 'create') {

                    let shortid = get_id()

                    job.photos = [...job.photos, {
                        shortid,
                        name: profile.username,
                        text,
                        image,
                        likes: 0
                    }]

                    job.photos = slicer(job.photos, 40)

                    feedback = JOB_PHOTO_CREATED

                } else if (option === 'like') {

                    job.photos.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                    feedback = JOB_PHOTO_LIKED

                } else {

                    job.photos = job.photos.filter(el => el.shortid !== coll_id)

                    feedback = JOB_PHOTO_DELETED
                }

                await Jobs.updateOne({shortid: id}, {$set: job})

                return feedback
            }

            return JOB_PHOTO_FALL
        }
        



    }
}

apollo_start(typeDefs, resolvers, app)

app.get('/towns', async (req, res) => {
    res.send(towns)
})

app.listen(PORT, () => console.log(`Server started on ${PORT} port`))