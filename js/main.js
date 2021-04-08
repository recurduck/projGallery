'use strict'

$(document).ready(init);

function init() {
    renderPortfolio();
    renderSocialMediaLinks();
    contactMessage();
}

function renderPortfolio() {
    var projs = getProjs();
    var strHtmls = projs.map(function (proj) {
        return `
        <div class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" data-toggle="modal" data-proj-id="${proj.id}" href="#portfolioModal1">
                <div class="portfolio-hover">
                    <div class="portfolio-hover-content">
                        <i class="fa fa-plus fa-3x"></i>
                    </div>
                </div>
                <img class="img-fluid" src="img/portfolio/${proj.id}-thumbnail.jpg" alt="">
            </a>
            <div class="portfolio-caption">
            <h4>${proj.title}</h4>
            <p class="text-muted">${proj.labels[0]}</p>
            </div>
        </div>
        `
    })
    $('.portfolio-items').html(strHtmls);

    var $elLinks = $('.portfolio-link')
    $elLinks.click(function () {
        renderModal($(this).data('proj-id'))
    })

}

function renderModal(projId) {
    var proj = getProjById(projId);
    var strHtml = `
    <h2>${proj.name}</h2>
    <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
    <img class="img-fluid d-block mx-auto" src="img/portfolio/${proj.id}-full.jpg" alt="">
    <p>${proj.desc}</p>
    <ul class="list-inline">
        <li>Date: ${convertTimestampToString(proj.publishedAt)}</li>
        <li>Client: Threads</li>
        <li>Category: ${proj.labels.map(label => label + ' ')}</li>
    </ul>
    <button class="btn btn-primary" data-dismiss="modal" type="button">
    <i class="fa fa-times"></i>
    Close Project
    </button>
    `;
    $('.modal-body').html(strHtml);

    $('.modal-body img').click(() => window.open(`projs/${proj.id}`, '_blank'));

}

function renderSocialMediaLinks() {
    var strHtml = 
    `<li class="list-inline-item twitter">
        <a href="#">
            <i class="fa fa-twitter"></i>
        </a>
    </li>
    <li class="list-inline-item facebook">
        <a href="#">
            <i class="fa fa-facebook"></i>
        </a>
    </li>
    <li class="list-inline-item linkedin">
        <a href="#">
            <i class="fa fa-linkedin"></i>
        </a>
    </li>`;


    $('.social-buttons').html(strHtml);
    
    $('.linkedin').click(function () {
        window.open('https://il.linkedin.com/in/ilai-greco-42a4311aa', '_blank');
    })    
    $('.facebook').click(function () {
        window.open('https://www.facebook.com/IlaiGr', '_blank');
    })

}

function contactMessage() {
    $('.btn-contact').click(() => {
        $('.body-input').val();
        $('.subject-input').val();
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=ilaigreco@gmail.com&su=${$('.subject-input').val()}&body=${$('.body-input').val()}`);
        $('.body-input').val('');
        $('.subject-input').val('');
        $('.email-input').val('');
    });

    $('.contact').click(function () {
        openCanvas()});
}

