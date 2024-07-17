/**
 * 任务信息
 */
export interface Task {
  /**
   * 具体内容
   */
  content: string;
  /**
   * 文件类型，文本(text)或音频(audio)
   */
  fileType: string;
  /**
   * 该任务对应的结果id
   */
  resultId: string;
  /**
   * 检测类型
   */
  scopeType: string;
  /**
   * 检测状态
   */
  status: Status;
  /**
   * 任务编号
   */
  taskId: string;
  [property: string]: any;
}

/**
 * 检测状态
 */
export enum Status {
  已完成 = "已完成",
  排队中 = "排队中",
  进行中 = "进行中",
}

/**
 * 结果信息
 */
export interface Result {
  /**
   * 对应的分组
   */
  category: string[];
  /**
   * 说明
   */
  message: string;
  /**
   * 结果id
   */
  resultId: string;
  /**
   * 置信度
   */
  score: string;
  /**
   * 该结果对应的任务id
   */
  taskId: string;
  [property: string]: any;
}