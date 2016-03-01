'use strict'

const $ = require('jquery')
const $container = require('../projects-container')

var template = `
<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-max col-centered item">
    <div class="project" shortTitle="{{shortTitle}}">
      <div class="image">
        <div class="over">
          <div class="actions">
            <div class="edit">
              <i class="fa fa-pencil"></i>
            </div>
            <div class="delete">
              <i class="fa fa-bomb"></i>
            </div>
          </div>
        </div>
        <img src="/{{images}}" alt="{{imagesAlt}}">
      </div>
      <div class="info">
        {{released}}
        <div class="bodyInfo">
          <span class="shortTitle">
            {{shortTitle}} <br>
          </span>
          <span class="date">
            {{date}}
          </span>
        </div>
      </div>
    </div>
  </div>`

var released = `
<div class="publicated yellow-p">
</div>`

var noReleased = `
<div class="publicated">
</div>`


function renderProjects(projects) {
  if (!projects.errCode){
    projects.forEach((project) => {
      var date = new Date(project.date)
      var releasedTemplate = project.released? released: noReleased
      var item = template
      .replace('{{shortTitle}}', project.shortTitle)
      .replace('{{images}}', project.images[0].url)
      .replace('{{imagesAlt}}', project.images[0].alt)
      .replace('{{released}}', releasedTemplate)
      .replace('{{shortTitle}}', project.shortTitle)
      .replace('{{date}}', date.toLocaleDateString())

      var $item = $(item)
      var $project = $item.find('.project')
      $project.data('shortTitle', project.shortTitle)
      $container.prepend($item)
    })
  }
}

module.exports = renderProjects
