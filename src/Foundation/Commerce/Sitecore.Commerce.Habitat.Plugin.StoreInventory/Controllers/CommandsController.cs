﻿// --------------------------------------------------------------------------------------------------------------------
// <copyright file="CommandsController.cs" company="Sitecore Corporation">
//   Copyright (c) Sitecore Corporation 1999-2017
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

using Plugin.Demo.HabitatHome.StoreInventorySet.Commands;
using Plugin.Demo.HabitatHome.StoreInventorySet.Models;
using Plugin.Demo.HabitatHome.StoreInventorySet.Pipelines.Arguments;
namespace Sitecore.Commerce.Plugin.Sample
{
    using System;
    using System.Threading.Tasks;
    using System.Web.Http.OData;

    using Microsoft.AspNetCore.Mvc;

    using Sitecore.Commerce.Core;
    
    using Newtonsoft.Json.Linq;
    using System.Collections.Generic;
    using System.Collections;
    
    using System.Linq;
    using System.Text.RegularExpressions;

    /// <inheritdoc />
    /// <summary>
    /// Defines a controller
    /// </summary>
    /// <seealso cref="T:Sitecore.Commerce.Core.CommerceController" />
    public class CommandsController : CommerceController
    {
        /// <inheritdoc />
        /// <summary>
        /// Initializes a new instance of the <see cref="T:Sitecore.Commerce.Plugin.Sample.CommandsController" /> class.
        /// </summary>
        /// <param name="serviceProvider">The service provider.</param>
        /// <param name="globalEnvironment">The global environment.</param>
        public CommandsController(IServiceProvider serviceProvider, CommerceEnvironment globalEnvironment)
            : base(serviceProvider, globalEnvironment)
        {
        }

        /// <summary>
        /// Samples the command.
        /// </summary>
        /// <param name = "value" > The value.</param>
        /// <returns>A<see cref="IActionResult"/></returns>
        [HttpPut]
        [Route("CreateStoreInventory()")]
        public async Task<IActionResult> CreateStoreInventory([FromBody] ODataActionParameters value)
        {
            if (!value.ContainsKey("stores") || !(value["stores"] is JArray))
                return (IActionResult)new BadRequestObjectResult((object)value);

            if (!value.ContainsKey("productsToAssociate") || !(value["productsToAssociate"] is JArray))
                return (IActionResult)new BadRequestObjectResult((object)value);
            JArray jarray = (JArray)value["stores"];
            JArray jarrayProducts = (JArray)value["productsToAssociate"];

          
            var storeInfos =  jarray != null ? jarray.ToObject<IEnumerable<StoreDetailsModel>>() : (IEnumerable<StoreDetailsModel>)null;
            var productsToAssociate = jarrayProducts != null ? jarrayProducts.ToObject<IEnumerable<string>>() : (IEnumerable<string>)null;

            // You need to have catalog mentioned if you are not providing a list of products to update inventory.
            if(productsToAssociate == null || string.IsNullOrEmpty(productsToAssociate.FirstOrDefault()))
            {
                if (!value.ContainsKey("catalog"))
                    return (IActionResult)new BadRequestObjectResult((object)value);
            }

            List<CreateStoreInventorySetArgument> args = new List<CreateStoreInventorySetArgument>();

            foreach(var store in storeInfos)
            {
                var storeName = Regex.Replace(store.StoreName, "[^0-9a-zA-Z]+", "");
                CreateStoreInventorySetArgument arg = new CreateStoreInventorySetArgument(storeName, store.StoreName, store.StoreName);

                if(string.IsNullOrEmpty(store.Country))
                {
                    store.Country = "US";
                }

                arg.Address = store.Address;
                arg.City = store.City;
                arg.Abbreviation = store.Abbreviation;
                arg.State = store.State;
                arg.ZipCode = store.ZipCode;
                arg.Long = store.Long;
                arg.Lat = store.Lat;
                arg.StoreName = store.StoreName;
                arg.CountryCode = store.Country;

                args.Add(arg);
            }


            var command = this.Command<CreateStoreInventoryCommand>();
            var result = await command.Process(this.CurrentContext, args, productsToAssociate.ToList(), Convert.ToString(value["catalog"]));

            return new ObjectResult(command);
        }
    }
}

