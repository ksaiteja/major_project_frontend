import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ProjectOverview() {

  return (
    <div className="project-overview w-96 p-8">
        <div>
          <img src="project_image_1.jpg" alt="Project Slide 1" />
          <p>Project Overview Slide 1</p>
        </div>
        <div>
          <img src="project_image_2.jpg" alt="Project Slide 2" />
          <p>Project Overview Slide 2</p>
        </div>
        {/* Add more slides as needed */}
      
    </div>
  );
}

export default ProjectOverview;
