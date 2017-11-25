using Abstracts;
using BusinessObjects;
using BusinessObjects.Mapper;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuisniessLogic
{
    public class UserService : IUserService
    {
        IRepository<UserDetails> userDetailsRepository;
        IRepository<ApplicationUser> userRepository;
        IRepository<StudentDetails> studentDetailsRepository;
        IRepository<TeacherDetails> teacherDetailsRepository;

        public UserService(IRepository<UserDetails> userDetailsRepository, IRepository<ApplicationUser> userRepository, IRepository<TeacherDetails> teacherDetailsRepository, IRepository<StudentDetails> studentDetailsRepository)
        {
            this.userDetailsRepository = userDetailsRepository;
            this.userRepository = userRepository;
            this.studentDetailsRepository = studentDetailsRepository;
            this.teacherDetailsRepository = teacherDetailsRepository;
        }
        public UserDetailsDto GetUser()
        {
            var result = new UserDetailsDto();
            result.Name = "Ana";
            result.Address = "....";
            return result;
        }
        /*  public IEnumerable<UserDetailsDto> GetAll()
          {
              var userEnitiy = userDetailsRepository.GetAll();
              var result = userEnitiy.ToUserDetailsDtos();
              return result;
          }*/

        public IEnumerable<StudentDetailsDto> GetAll()
        {
            var userEnitiy = studentDetailsRepository.GetAll();
            var result = userEnitiy.ToStudentDetailsDtos();
            return result;
        }
        public void InitDetails(object userId)
        {
            
                var entity = userRepository.GetById(userId);
                entity.UserDetails = new UserDetails();
                userRepository.Save();
           
        }
        /*   public void AddStudent(StudentDetailsDto Student)
             {

                     var entity = SchoolMapper.FromStudentDetailsDtos(Student);
                     studentDetailsRepository.Insert(entity);
                     studentDetailsRepository.Save();
                 }*/
        public void UpdateStudent()

        {

        }
        public void AddOrUpdateStudent(StudentDetailsDto Student)
        {
            StudentDetails entityStudent=null;
            if ( Student.Id!=null)
            {
                entityStudent = studentDetailsRepository.GetById(Student.Id);
                var entity = SchoolMapper.FromStudentDetailsDtos(Student, entityStudent);
                studentDetailsRepository.Update(entity);
            }
            else
            {
                entityStudent = new StudentDetails();
                var entity = SchoolMapper.FromStudentDetailsDtos(Student, entityStudent);
                studentDetailsRepository.Insert(entity);
            }

          
               
            studentDetailsRepository.Save();
        }
        public void AddTeacher(TeacherDetailsDto Student)
        {
            
            var entity = SchoolMapper.FromTeachersDetailsDtos(Student);
            teacherDetailsRepository.Insert(entity);
            teacherDetailsRepository.Save();
        }
        public void AddUser(UserDetailsDto user)
        {

            //  var result = .ToStudentDetailsDtos();
            var entity = UserDetailsMapper.FromUserDetailsDtos(user);
            userDetailsRepository.Insert(entity);
            userDetailsRepository.Save();
        }
       
        public IEnumerable<StudentDetailsDto> GetAllStudents()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<TeacherDetailsDto> GetAllTechers()
        {
            throw new NotImplementedException();
        }
    }

        }

       

        


