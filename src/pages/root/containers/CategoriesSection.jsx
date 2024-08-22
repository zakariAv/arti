import { motion } from 'framer-motion'
import medicinePic from '/assets/categories/medicine.jpg'
import mathPic from '/assets/categories/maths.jpg'
import engPic from '/assets/categories/engineering.jpg'
import plantsPic from '/assets/categories/plants.png'
import newsPic from '/assets/categories/news.jpg'
import healthPic from '/assets/categories/health.jpg'


const CategoriesSection = () => {


    const CategoryCard = ({ image, title, desc }) => {
        return <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="max-w-sm rounded overflow-hidden shadow-lg  hover:scale-105 transition-all hover:shadow-xl">
            <img className="w-full" src={image} alt="Sunset in the mountains" />
            <div className="px-3 py-2 lg:px-6 lg:py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">
                    {desc}
                </p>
            </div>

        </motion.div>
    }
    return (
        <div className="p-3 bg-[#f1f6f8] border-2 border-stone-300">
            <h2 className="py-5 text-2xl md:text-3xl text-center font-extrabold">
                Our Basic Categories
            </h2>
            <div className=" pt-5 grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
                {/* item1 */}
                <CategoryCard
                    image={medicinePic}
                    title='Medicine'
                    desc="Medicine is the science and practice
                    of caring for patients, managing the diagnosis,
                     prognosis, prevention, treatment, palliation of
                      their injury or disease, and promoting their health."
                />

                <CategoryCard
                    image={engPic}
                    title='Engineering'
                    desc="Engineering is the practice of using natural science, 
                    mathematics, and the engineering design process
                   to solve technical problems, increase efficiency and productivity,
                    and improve systems. Modern engineering comprises many subfields 
                    which include designing and improving infrastructure, machinery,
                     vehicles, electronics, materials, and energy systems."
                />

                <CategoryCard
                    image={plantsPic}
                    title='Agriculture'
                    desc="Agriculture encompasses crop and livestock production, aquaculture, and forestry for food and non-food products. Agriculture was the key development in the rise of sedentary human civilization, whereby farming of domesticated species created food surpluses that enabled people to live in cities."
                />


                <CategoryCard
                    image={mathPic}
                    title='Math'
                    desc="Mathematics is a field of study that discovers and organizes methods, theories and theorems that are developed and proved for the needs of empirical sciences and mathematics itself."
                />


                <CategoryCard
                    image={healthPic}
                    title='Health'
                    desc="Health has a variety of definitions, which have been used for different purposes over time. In general, it refers to physical and emotional well-being, especially that associated with normal functioning of the human body, absent of disease, pain (including mental pain), or injury."
                />

                <CategoryCard
                    image={newsPic}
                    title='News'
                    desc="News is information about current events. This may be provided through many different media: word of mouth, printing, postal systems, broadcasting, electronic communication, or through the testimony of observers and witnesses to events. News is sometimes called -hard news- to differentiate it from soft media."
                />



            </div>
        </div>
    )
}

export default CategoriesSection