import {request} from "@/network/request";

export function getHomeViewData() {
  return request({
    url: 'demo.json'
  })
}