import http from "axios";

import { SERVER_URL, asyncLocalStorage, TOKEN } from "../utility/global";
function header(token) {
  if (token) {
    return {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ` + token,
      },
    };
  } else {
    return {
      headers: {
        "Content-type": "application/json",
      },
    };
  }
}
class ClientService {
  hasAuth = async (data) => {
    const token = await asyncLocalStorage.getItem(TOKEN);

    return http.get(`${SERVER_URL}/isLogin`, header(token));
  };
  faculties = async () => {
    return http.post(`${SERVER_URL}/faculties`);
  };

  institutions = async () => {
    return http.post(`${SERVER_URL}/institutions`);
  };

  signIn = async (data) => {
    return http.post(`${SERVER_URL}/signIn`, data);
  };
  signUp = async (data) => {
    return http.post(`${SERVER_URL}/signUp`, data);
  };

  searchCourse = async (data) => {
    return http.post(`${SERVER_URL}/searchCourse`, data);
  };

  qualificationTypes = async () => {
    return http.post(`${SERVER_URL}/qualificationTypes`);
  };

  saveQualification = async (data) => {
    return http.post(`${SERVER_URL}/qualification`, data);
  };

  saveEnglishTest = async (data) => {
    return http.post(`${SERVER_URL}/englishTest`, data);
  };

  savePreviousQualification = async (data) => {
    return http.post(`${SERVER_URL}/previousQualification`, data);
  };

  saveSponsor = async (data) => {
    return http.post(`${SERVER_URL}/sponsorship`, data);
  };

  countries = async () => {
    return http.post(`${SERVER_URL}/countries`);
  };

  saveVisa = async (data) => {
    return http.post(`${SERVER_URL}/visaHistory`, data);
  };

  findSponsor = async (data) => {
    return http.post(`${SERVER_URL}/findSponsorshipByUser`, data);
  };

  findVisa = async (data) => {
    return http.post(`${SERVER_URL}/findVisaHistoryByUser`, data);
  };

  findHighestQualification = async (data) => {
    return http.post(`${SERVER_URL}/findHighestQualificationByUser`, data);
  };

  findEnglish = async (data) => {
    return http.post(`${SERVER_URL}/findEnglishByUser`, data);
  };
  saveHighSchool = async (data) => {
    return http.post(`${SERVER_URL}/highSchool`, data);
  };
  findHighSchool = async (data) => {
    return http.post(`${SERVER_URL}/findHighSchoolByUser`, data);
  };

  findPreviousQualification = async (data) => {
    return http.post(`${SERVER_URL}/findPreviousQualificationByUser`, data);
  };

  popularCourses = async (data) => {
    return http.post(`${SERVER_URL}/popularCourses`, data);
  };

  findUserById = async (data) => {
    return http.post(`${SERVER_URL}/userById`, data);
  };

  updateUserInfo = async (data, userId) => {
    return http.patch(`${SERVER_URL}/user/${userId}`, data);
  };
  deleteCourse = async (id) => {
    return http.delete(`${SERVER_URL}/course/${id}`);
  };

  updateCourse = async (data, courseId) => {
    return http.patch(`${SERVER_URL}/updateCourse/${courseId}`, data);
  };

  saveCourse = async (data) => {
    return http.post(`${SERVER_URL}/saveCourse`, data);
  };

  relatedCourses = async (data) => {
    return http.post(`${SERVER_URL}/findCoursesByFaculty`, data);
  };
  saveInstitution = async (data) => {
    return http.post(`${SERVER_URL}/saveInstitution`, data);
  };

  allInstitutions = async () => {
    return http.post(`${SERVER_URL}/allInstitutions`);
  };
  allApplications = async () => {
    return http.post(`${SERVER_URL}/allApplications`);
  };

  cities = async () => {
    return http.post(`${SERVER_URL}/allCities`);
  };

  allUsers = async () => {
    return http.post(`${SERVER_URL}/allUsers`);
  };

  saveApplication = async (data) => {
    return http.post(`${SERVER_URL}/saveApplication`, data);
  };

  findApplicationsByUser = async (data) => {
    return http.post(`${SERVER_URL}/findApplicationsByUser`, data);
  };

  degreeTypes = async (data) => {
    return http.post(`${SERVER_URL}/degreeTypes`, data);
  };

  allCoursesSearch = async (data) => {
    return http.post(`${SERVER_URL}/allCoursesSearch`, data);
  };

  findCourseByInstitution = async (data) => {
    return http.post(`${SERVER_URL}/findCourseByInstitution`, data);
  };

  findCourseById = async (id) => {
    return http.get(`${SERVER_URL}/course/${id}`);
  };

  courseByParams = async (data) => {
    return http.post(`${SERVER_URL}/courseByParams`, data);
  };

  findCourseByInstitutionForReg = async (data) => {
    return http.post(`${SERVER_URL}/findCourseByInstitutionForReg`, data);
  };

  institutionsLighter = async () => {
    return http.post(`${SERVER_URL}/institutionsLighter`);
  };

  findInstitutionById = async (data) => {
    return http.post(`${SERVER_URL}/findInstitutionById`, data);
  };
  findFacultyPhotos = async (data) => {
    return http.post(`${SERVER_URL}/findFacultyPhotos`, data);
  };
  findAllPhotos = async () => {
    return http.post(`${SERVER_URL}/findAllPhotos`);
  };
}
export default new ClientService();
