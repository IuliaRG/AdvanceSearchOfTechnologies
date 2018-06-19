﻿using BusinessObjects.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects
{
    public class ProductPaginingParametersDto
    {
        public int PageNumber { get; set; } = 1;
        public int _ItemsOnPage { get; set; } = 3;
        public int MaxPageItems { get; set; }
        public int ItemsOnPage
        {
            get { return _ItemsOnPage; }
            set
            {
                _ItemsOnPage = value;
            }
        }
        public string SearchText { get; set; }
        public string Brand { get; set; }
        public string Category { get; set; }
        public string SortField { get; set; }
        public string SortDirection { get; set; }
        public int CurrentPage { get; set; }
        public int LastPage { get; set; }
        public List<ProductDetailsDto> Data { get; set; }
        public object Meniu { get; set; }
    }
}
public class MenuItemDTO
{
    public string CategoryName;
}
