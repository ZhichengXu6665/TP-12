import KnowledgeHub from "../components/KnowledgeHub"
import './KnowledgeHubPage.css'
import image1 from '../assets/knowledgehubimage1.jpeg'
import image2 from '../assets/knowledgehubimage2.jpeg'
import '../components/Visualization'
import Visualization from "../components/Visualization"
function KnowledgeHubPage(){
  return (
    <div>
      <div className="title">
        <h1>Embrace Sustainable Living: A Path to a Greener Future</h1>
      </div>
      <div className="KnowledgeHubIntroduction">
        <div className="KnowledgeHubIntroductionText1">
          <p>In today's rapidly changing world, sustainable living has become more than just a trend—it's a necessity. As environmental challenges like climate change, resource depletion, and pollution continue to rise, it's crucial for each of us to take responsibility and make conscious choices that reduce our environmental impact</p>
        </div>
        <div className="IntroductionImageContainer1">
          <img src={image1} className='KnowledgeHubIntroductionImg1'/>
        </div>
        <div className="IntroductionImageContainer2">
          <img src={image2} className="KnowledgeHubIntroductionImg2" />
        </div>
        <div className="KnowledgeHubIntroductionText2">
          <p>1.3 Billon tons of food is wasted every year</p>
        </div>
      </div>
      <div className="VisContainer">
        <div className="title2">
          <h2>Global Waste Comparision by Country</h2>
        </div>
        <Visualization/>
        <div className="VisText">
          <p>This chart provides a visual comparison of the estimated household waste generated annually by various countries. The data is sorted from highest to lowest, offering a clear view of the countries contributing the most to global food waste. Use the dropdown menu to navigate through different sets of countries and observe how waste generation varies across the globe.</p>
        </div>
      </div>      
      <div>
        <div className="title2">
          <h2>How You Can Help Reduce Food Waste</h2>
        </div>
        <KnowledgeHub/>
      </div>
    </div>
  )
}

export default KnowledgeHubPage