using BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracts
{
    public interface IUserService
    {
        UserDetailsDto GetUser();
        IEnumerable<StudentDetailsDto> GetAll();
        IEnumerable<StudentDetailsDto> GetAllStudents();
        IEnumerable<TeacherDetailsDto> GetAllTechers();

        void InitDetails(object userId);
        void AddOrUpdateStudent(StudentDetailsDto Student);
        void AddTeacher(TeacherDetailsDto Student);
        void AddUser(UserDetailsDto Student);


    }
}
