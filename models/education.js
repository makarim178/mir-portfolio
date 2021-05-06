class Education {
    constructor(id, instituteName, instituteAddress, gradName, completionRate, status, url, yearStarted, yearEnded) {
        this.id = id;
        this.instituteName = instituteName;
        this.instituteAddress = instituteAddress;
        this.gradName = gradName;
        this.completionRate = completionRate;
        this.status = status;
        this.url = url;
        this.yearStarted = yearStarted;
        this.yearEnded = yearEnded;
    }
}

module.exports = Education;