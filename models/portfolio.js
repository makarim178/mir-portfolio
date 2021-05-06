class Portfolio {
    constructor(id, firstName, lastName, initialName, logo, title, subTitle
        , titleImageUrl, resumeLink, aboutImgUrl, adjectiveWords, aboutDesc, location
        , email, phone, links) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.initialName = initialName;        
        this.logo = logo;        
        this.title = title;
        this.subTitle = subTitle;
        this.titleImageUrl  = titleImageUrl;
        this.resumeLink = resumeLink;
        this.aboutImgUrl = aboutImgUrl;
        this.adjectiveWords = adjectiveWords;
        this.aboutDesc = aboutDesc;
        this.location = location;
        this.email = email;
        this.phone = phone;
        this.links = links;
    }
}



module.exports = Portfolio;