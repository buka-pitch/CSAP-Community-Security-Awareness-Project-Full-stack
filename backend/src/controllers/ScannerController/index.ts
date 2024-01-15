import { NextFunction, Request, Response } from "express";
import axios from "axios";
import {} from "timers/promises";
import { ApiResponse } from "../../types/global";
export async function ScanUrl(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body.url) throw new Error("url is required!");
    const { url } = req.body;
    console.log(url);
    const encodedParams = new URLSearchParams();
    encodedParams.set("url", url);

    const options = {
      method: "POST",
      url: "https://www.virustotal.com/api/v3/urls",
      headers: {
        accept: "application/json",
        "x-apikey": process.env.VIRUSTOTAL_KEY,
        "content-type": "application/x-www-form-urlencoded",
      },
      data: encodedParams,
    };
    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data.data);
        return response.data.data;
      })
      .then(async (data) => {
        const options2 = {
          method: "GET",
          url: "https://www.virustotal.com/api/v3/analyses/" + data.id,
          headers: {
            accept: "application/json",
            "x-apikey": process.env.VIRUSTOTAL_KEY,
          },
        };

        setTimeout(async () => {
          let response = await axios
            .request(options2)
            .then(async function (response) {
              let stats = response.data.data.attributes.stats;
              console.log(response.data.data.attribute);
              console.log(stats);
              const apiresponse: ApiResponse = {
                data: stats,
                message: "scan report",
                status: "Success",
                statusCode: 200,
              };
              return res.json(apiresponse);
            })
            .catch((err) => {
              return next(err);
            });
        }, 10000);
      });
  } catch (error) {
    return next(error);
  }
}
