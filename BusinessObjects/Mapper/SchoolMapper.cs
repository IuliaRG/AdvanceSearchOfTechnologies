using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects.Mapper
{
   public static class SchoolMapper
    {
        public static IEnumerable<StudentDetailsDto> ToStudentDetailsDtos(this IEnumerable<StudentDetails> userDetails)
        {
            var result = userDetails.Select(it => new StudentDetailsDto()
            {
                Id = it.Id,
                Name = it.Name,
                Grades = it.Grades
            });

            return result;
        }
    /*    public static StudentDetails FromStudentDetailsDtos(this StudentDetailsDto studentDetailsDto)
        {
            var entityStudent = new StudentDetails();
            if (studentDetailsDto.Id.HasValue)
            entityStudent.Id = studentDetailsDto.Id.Value;
            entityStudent.Name = studentDetailsDto.Name;
            entityStudent.Grades = studentDetailsDto.Grades;
            return entityStudent;
        }*/
        public static StudentDetails FromStudentDetailsDtos(this StudentDetailsDto dto,StudentDetails entity)
        {
            if (dto.Id.HasValue)
                entity.Id = dto.Id.Value;
            entity.Name = dto.Name;
            entity.Grades = dto.Grades;
                
            return entity;
        }
        public static TeacherDetails FromTeachersDetailsDtos(TeacherDetailsDto studentDetailsDto)
        {
            var entityStudent = new TeacherDetails();
            if (studentDetailsDto.Id.HasValue)
                entityStudent.Id = studentDetailsDto.Id.Value;
            entityStudent.FirstName = studentDetailsDto.FirstName;
            entityStudent.LastName = studentDetailsDto.LastName;
            entityStudent.Discipline = studentDetailsDto.Discipline;
            return entityStudent;
        }

        public static IEnumerable<TeacherDetailsDto> ToTeacherDetailsDtos(this IEnumerable<TeacherDetails> userDetails)
        {
            var result = userDetails.Select(it => new TeacherDetailsDto()
            {
                Id = it.Id,
                FirstName=it.FirstName,
                LastName=it.LastName,
                Discipline=it.Discipline
               
            });

            return result;
        }
    }
}
