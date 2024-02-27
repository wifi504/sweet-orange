import {request} from "@/network/request";

export function getHomeViewData() {
  return request({
    url: 'sweet-orange-demo.json'
  })
}